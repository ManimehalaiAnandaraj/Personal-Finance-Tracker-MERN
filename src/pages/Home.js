import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      <h1 className="text-5xl font-bold mb-8">Welcome to Personal Finance Tracker</h1>
      <div className="space-x-4">
        <Link to="/login" className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </Link>
        <Link to="/register" className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Home;
