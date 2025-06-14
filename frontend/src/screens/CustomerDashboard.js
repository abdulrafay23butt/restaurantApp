import React, { useState } from 'react';
import ViewRestaurants from './customer/ViewRestaurants';
import MyBookings from './customer/MyBookings';

function CustomerDashboard() {
  const [view, setView] = useState('restaurants');

  const sidebarBtn = (label, v) => (
    <li>
      <button
        style={{
          width: '100%',
          margin: '8px 0',
          background: view === v ? '#1976d2' : '#fff',
          color: view === v ? '#fff' : '#222',
          border: 'none',
          borderRadius: 6,
          fontWeight: 500,
          fontSize: 16,
          padding: '10px 0',
          boxShadow: view === v ? '0 2px 8px #1976d233' : '0 1px 4px #eee',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onClick={() => setView(v)}
      >
        {label}
      </button>
    </li>
  );

  return (
    <div style={{ minHeight: '100vh', background: "url('../../public/bgimg.jpg')", padding: '40px 0' }}>
      <div style={{ margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px rgba(25, 118, 210, 0.08)', padding: 0, minHeight: 700, display: 'flex' }}>
        <aside style={{ width: 240, background: '#f5f5f5', padding: 24, boxShadow: '2px 0 8px #eee', borderTopLeftRadius: 16, borderBottomLeftRadius: 16, marginRight: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ marginBottom: 32, color: '#1976d2', letterSpacing: 1 }}>Customer</h3>
          <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
            {sidebarBtn('View Restaurants', 'restaurants')}
            {sidebarBtn('My Bookings', 'bookings')}
            <li>
              <button style={{ width: '100%', margin: '8px 0', background: '#fff', color: '#d32f2f', border: '1px solid #ffd180', borderRadius: 6, fontWeight: 500, fontSize: 16, padding: '10px 0', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</button>
            </li>
          </ul>
        </aside>
        <main style={{ flex: 1, padding: 40, background: '#f9f9fb', minHeight: '100vh', borderRadius: 12 }}>
          {view === 'main' && (
            <div style={{ textAlign: 'center', marginTop: 100 }}>
              <h2 style={{ fontSize: 32, color: '#1976d2', marginBottom: 8, letterSpacing: 1 }}>Welcome, Customer!</h2>
              <p style={{ color: '#555', fontSize: 18 }}>Select an option from the sidebar.</p>
            </div>
          )}
          {view === 'restaurants' && <ViewRestaurants />}
          {view === 'bookings' && <MyBookings />}
        </main>
      </div>
    </div>
  );
}

export default CustomerDashboard; 