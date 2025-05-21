// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Users from './pages/Users';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import BookRide from './pages/BookRide';
import MyRides from './pages/MyRides';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
    alert(`Login successful! Welcome, ${user.firstName}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
    alert('Logged out successfully!');
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar loggedInUser={loggedInUser} onLogout={handleLogout} />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/users" element={<Users />} />
            <Route path="/dashboard" element={<Dashboard loggedInUser={loggedInUser} />} />
            <Route path="/book-ride" element={<BookRide loggedInUser={loggedInUser} />} />
            <Route path="/my-rides" element={<MyRides loggedInUser={loggedInUser} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;