import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token"); // check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT token
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">Finance Tracker</Link>
      </div>
      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="px-3 py-1 rounded hover:bg-blue-600"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded bg-red-500 hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 rounded hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 rounded hover:bg-green-600"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
