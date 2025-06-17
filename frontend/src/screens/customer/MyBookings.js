import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ClipLoader } from 'react-spinners';

function MyBookings() {
  const { userData } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userData?.id) return;
    setLoading(true);
    fetch(`http://localhost:3001/api/getBooking/${userData.id}`)
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(() => setError('Failed to fetch bookings'))
      .finally(() => setLoading(false));
  }, [userData]);

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px #e3f0ff', padding: 40, minHeight: 500 }}>
      <h2 style={{ color: '#1976d2', marginBottom: 24, textAlign: 'center' }}>My Bookings</h2>
      {loading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}><ClipLoader color="#1976d2" /></div>}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      {bookings.length === 0 && !loading && <p style={{ color: '#555', fontSize: 18, textAlign: 'center' }}>No bookings found.</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {bookings.map(b => (
          <div key={b._id} style={{ border: '1px solid #e3f0ff', borderRadius: 12, boxShadow: '0 2px 8px #e3f0ff', padding: 24, background: '#fafdff', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: 18, color: '#1976d2' }}>Booking for {b.seats} seat{b.seats > 1 ? 's' : ''}</span>
              <span style={{ fontWeight: 500, color: b.status === 'completed' ? '#388e3c' : '#d32f2f' }}>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</span>
            </div>
            <div style={{ color: '#555', fontSize: 16 }}>Date: {new Date(b.date).toLocaleDateString()} | Time: {b.time}</div>
            <div style={{ color: '#888', fontSize: 15 }}>Booker: {b.name} | Phone: {b.phone}</div>
            <div style={{ color: '#aaa', fontSize: 13 }}>Booking ID: {b._id}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings; 