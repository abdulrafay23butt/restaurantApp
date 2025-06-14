import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../context/AuthContext.js"

function CustomerDashboard() {
  const { logout } = useAuth()
  const logggedout = () => {
    logout();
    navigate('/login')
  }
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside style={{ width: 220, background: '#f5f5f5', padding: 24, boxShadow: '2px 0 8px #eee' }}>
        <h3>Customer</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><button style={{ width: '100%', margin: '8px 0' }}>View Restaurants</button></li>
          <li><button style={{ width: '100%', margin: '8px 0' }}>My Bookings</button></li>
          <li><button style={{ width: '100%', margin: '8px 0' }} onClick={logggedout}>Logout</button></li>
        </ul>
      </aside>
      <main style={{ flex: 1, padding: 32 }}>
        <h2>Welcome, Customer!</h2>
        <p>Select an option from the sidebar.</p>
      </main>
    </div>
  );
}

export default CustomerDashboard; 