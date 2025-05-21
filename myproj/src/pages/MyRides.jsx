// src/pages/MyRides.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import api from '../../src/api'; // Adjust path as needed
function MyRides({ loggedInUser }) {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyRides = async () => {
      if (!loggedInUser?.id) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get(`/api/my-rides/${loggedInUser.id}`);
        setRides(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRides();
  }, [loggedInUser?.id]);

  if (loading) {
    return <div>Loading your previous rides...</div>;
  }

  if (error) {
    return <div>Error loading rides: {error.message}</div>;
  }

  return (
    <div className="container pt-5">
      <h1>My Previous Rides</h1>
      {rides.length === 0 ? (
        <p>No previous rides found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>From City</th>
              <th>To City</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Booked At</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => (
              <tr key={ride.id}>
                <td>{ride.fromCity}</td>
                <td>{ride.toCity}</td>
                <td>{new Date(ride.date).toLocaleDateString()}</td>
                <td>{ride.time}</td>
                <td>{ride.amount}</td>
                <td>{new Date(ride.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyRides;