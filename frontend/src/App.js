import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import CustomerDashboard from './screens/CustomerDashboard';
import AdminDashboard from './screens/AdminDashboard';
import ManagerDashboard from './screens/ManagerDashboard';
import ApproveUsers from './screens/admin/ApproveUsers';
import ManageUsers from './screens/admin/ManageUsers';
import AddRestaurant from './screens/admin/AddRestaurant';
import ManageRestaurants from './screens/admin/ManageRestaurants';
import ManagerRevenue from './screens/manager/ManagerRevenue';
import ManagerMenu from './screens/manager/ManagerMenu';
import ManagerBookings from './screens/manager/ManagerBookings';
import './App.css';

function isAuthenticated() {
  // Example: check for a token in localStorage
  return !!localStorage.getItem('token');
}

function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/customer" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/dashboard/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}>
          <Route path="approve" element={<ApproveUsers />} />
          <Route path="manage" element={<ManageUsers />} />
          <Route path="add-restaurant" element={<AddRestaurant />} />
          <Route path="manage-restaurants" element={<ManageRestaurants />} />
        </Route>
        <Route path="/dashboard/manager" element={<ProtectedRoute><ManagerDashboard /></ProtectedRoute>}>
          <Route path="revenue" element={<ManagerRevenue />} />
          <Route path="menu" element={<ManagerMenu />} />
          <Route path="bookings" element={<ManagerBookings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
