import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

function CustomerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(() => {
    return localStorage.getItem("active") || "View Restaurants";
  });

  // Keep active in sync with localStorage on route change
  useEffect(() => {
    const current = localStorage.getItem("active") || "View Restaurants";
    setActive(current);
  }, [location.pathname]);



  const sidebarBtn = (label, path) => (

    <li>
      <button
        style={{
          width: '100%',
          margin: '8px 0',
          background: (active === label) ? '#1976d2' : '#fff',
          color: active === label ? '#fff' : '#222',
          border: 'none',
          borderRadius: 6,
          fontWeight: 500,
          fontSize: 16,
          padding: '10px 0',
          boxShadow: active === label ? '0 2px 8px #1976d233' : '0 1px 4px #eee',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onClick={() => { navigate(path); setActive(label); localStorage.setItem("active", label) }}
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
            {sidebarBtn('View Restaurants', '/dashboard/customer')}
            {sidebarBtn('My Bookings', '/dashboard/customer/bookings')}
            {sidebarBtn('Checkout', '/dashboard/customer/checkout')}
            <li>
              <button style={{ width: '100%', margin: '8px 0', background: '#fff', color: '#d32f2f', border: '1px solid #ffd180', borderRadius: 6, fontWeight: 500, fontSize: 16, padding: '10px 0', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</button>
            </li>
          </ul>
        </aside>
        <main style={{ flex: 1, padding: 40, background: '#f9f9fb', minHeight: '100vh', borderRadius: 12 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default CustomerDashboard; 