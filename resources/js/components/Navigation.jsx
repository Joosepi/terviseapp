import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPaw } from "react-icons/fa";

const Navigation = ({ user, onLogout }) => {
  const location = useLocation();

  const navLink = (to, label) => (
    <Link
      to={to}
      className={`mx-3 px-2 py-1 rounded transition font-medium ${
        location.pathname === to
          ? "bg-accent text-primary shadow"
          : "text-beige hover:bg-accent/70 hover:text-primary"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-primary text-beige px-8 py-3 flex justify-between items-center shadow-lg sticky top-0 z-50">
      {/* Logo and Brand */}
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition">
          <FaPaw className="text-2xl text-accent drop-shadow" />
          <span className="text-xl font-extrabold tracking-wide text-beige drop-shadow">LoomaTerviseApp</span>
        </Link>
      </div>

      {/* Centered Links */}
      <div className="flex-1 flex justify-center">
        {navLink("/dashboard", "Dashboard")}
        {navLink("/pets", "My Pets")}
      </div>

      {/* Auth/User Actions */}
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-accent">Hello, {user.name}</span>
            <button
              onClick={onLogout}
              className="bg-accent text-primary px-4 py-2 rounded shadow hover:bg-secondary transition font-bold"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-accent text-primary px-4 py-2 rounded shadow hover:bg-secondary transition font-bold"
          >
            Login/Register
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 