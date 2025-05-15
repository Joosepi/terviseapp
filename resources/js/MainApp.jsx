import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PetsList from './components/PetsList';
import PetProfile from './components/PetProfile';
import { FaPaw, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import axios from 'axios';

// Simple landing page
function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-beige relative overflow-hidden">
      {/* Subtle background gradient circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent opacity-20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary opacity-20 rounded-full blur-3xl z-0"></div>

      {/* Tagline badge */}
      <div className="z-10 flex items-center gap-2 bg-accent/80 text-primary px-4 py-1 rounded-full mb-4 shadow">
        <FaPaw className="text-lg" />
        <span className="font-semibold tracking-wide">Pet Wellness Platform</span>
      </div>

      {/* Main Title */}
      <h1 className="z-10 text-5xl font-extrabold text-primary mb-2 drop-shadow-lg text-center">
        LoomaTerviseApp
      </h1>
      <p className="z-10 text-xl text-secondary mb-8 max-w-xl text-center">
        The easiest way to manage your pets' health, activities, and well-being.<br />
        <span className="text-accent font-semibold">All in one place.</span>
      </p>

      {/* Glassmorphism Card for Dog Image */}
      <div className="z-10 bg-white/60 backdrop-blur-md border-2 border-accent shadow-2xl rounded-3xl p-4 mb-8 transition-transform hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(34,40,49,0.25)] duration-300">
        <img
          src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80"
          alt="Cute pet"
          className="rounded-2xl w-80 h-56 object-cover shadow-lg"
        />
      </div>

      {/* Get Started Button */}
      <a
        href="/register"
        className="z-10 flex items-center gap-2 bg-primary text-beige px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-secondary hover:scale-105 transition"
      >
        <FaPaw className="text-xl" />
        Get Started
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-beige py-8 mt-16">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <FaPaw className="text-2xl text-accent" />
          <span className="font-bold text-lg">LoomaTerviseApp</span>
        </div>
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="/" className="hover:text-accent transition">Home</a>
          <a href="/dashboard" className="hover:text-accent transition">Dashboard</a>
          <a href="/pets" className="hover:text-accent transition">My Pets</a>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-accent transition"><FaGithub /></a>
          <a href="#" className="hover:text-accent transition"><FaTwitter /></a>
          <a href="#" className="hover:text-accent transition"><FaInstagram /></a>
        </div>
      </div>
      <div className="text-center text-xs text-accent mt-4">
        © {new Date().getFullYear()} LoomaTerviseApp. Made with ❤️ at Kuressaare Vocational School.
      </div>
    </footer>
  );
}

function MainApp() {
  // Simulate authentication state (replace with real auth logic)
  const [user, setUser] = useState(null);

  // Simulate checking for a token (replace with real logic)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData.user);
    localStorage.setItem('token', userData.token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-beige">
        <Navigation user={user} onLogout={handleLogout} />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register onLogin={handleLogin} />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/pets" element={user ? <PetsList /> : <Navigate to="/login" />} />
            <Route path="/pets/:id" element={user ? <PetProfile /> : <Navigate to="/login" />} />
            {/* Add more routes as needed */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default MainApp;