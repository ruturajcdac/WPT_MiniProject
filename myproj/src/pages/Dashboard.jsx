// src/pages/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import "./dashboard.css";

function Dashboard({ loggedInUser }) {
  const navigate = useNavigate();

  const handleBookRideClick = () => {
    navigate('/book-ride');
  };

  const handleMyRidesClick = () => {
    navigate('/my-rides');
  };

  return (
    <div className="container pt-5">
      <h1>Welcome, {loggedInUser?.firstName}!</h1>
      <button className="btn btn-primary me-2" onClick={handleBookRideClick}>
        Book a ride
      </button>
      <button className="btn btn-secondary" onClick={handleMyRidesClick}>
        My previous rides
      </button>
    </div>
  );
}

export default Dashboard;