import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard";
import AuthContext from "./context/AuthContext";

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

// Define routes
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: <PrivateRoute><Dashboard /></PrivateRoute>
  },
  {
    path: "*",
    element: <Navigate to="/" />
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

const App = () => <RouterProvider router={router} />;

export default App;
