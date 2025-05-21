// src/pages/BookRide.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Keep the import
import api from '../api';

function BookRide({ loggedInUser }) {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bangalore', 'Hyderabad'];
  const navigate = useNavigate(); // Move this INSIDE the component

  const handleFindRides = async () => {
    try {
      const response = await api.post('/api/calculate-ride', { fromCity, toCity });
      setTotalAmount(response.data.totalAmount);
    } catch (error) {
      console.error('Error calculating ride:', error.response?.data?.message || error.message);
      setTotalAmount('Error');
    }
  };

  const handleBookNow = async () => {
    if (!fromCity || !toCity || !totalAmount) {
      alert('Please select cities and find rides first.');
      return;
    }
    try {
      setIsBooking(true);
      const response = await api.post('/api/book-ride', {
        fromCity,
        toCity,
        amount: totalAmount,
      });
      setBookingStatus(response.data.message);
      setFromCity('');
      setToCity('');
      setTotalAmount('');
      navigate('/dashboard'); // This will now work
    } catch (error) {
      setBookingStatus(error.response?.data?.message || 'Booking failed. Please try again or log in.');
    } finally {
      setIsBooking(false);
    }
  };

  const handleCancel = () => {
    setFromCity('');
    setToCity('');
    setTotalAmount('');
    setBookingStatus('');
  };

  return (
    <div className="container pt-5">
      <h1>Book a Ride</h1>
      <div>
        <label htmlFor="fromCity">From City:</label>
        <select
          id="fromCity"
          className="form-control"
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
          disabled={isBooking}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="toCity">To City:</label>
        <select
          id="toCity"
          className="form-control"
          value={toCity}
          onChange={(e) => setToCity(e.target.value)}
          disabled={isBooking}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-primary mt-3 me-2"
        onClick={handleFindRides}
        disabled={isBooking}
      >
        Find Rides
      </button>
      <div className="mt-3">
        <strong>Total Amount:</strong> {totalAmount}
      </div>
      <button
        className="btn btn-success mt-3 me-2"
        onClick={handleBookNow}
        disabled={isBooking}
      >
        {isBooking ? 'Booking...' : 'Book Now'}
      </button>
      <button
        className="btn btn-secondary mt-3"
        onClick={handleCancel}
        disabled={isBooking}
      >
        Cancel
      </button>
      {bookingStatus && <div className="mt-3 alert alert-info">{bookingStatus}</div>}
    </div>
  );
}

export default BookRide;