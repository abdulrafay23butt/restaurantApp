import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RestaurantMenu() {
  const { id } = useParams(); // restaurant/branch id
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [reserveDetails, setReserveDetails] = useState({ date: '', time: '', seats: '', name: '', phone: '' });
  const [reserveError, setReserveError] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const currentTimeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`http://localhost:3001/api/getMenu/${id}`)
      .then(res => res.json())
      .then(data => setMenu(data.items || []))
      .catch(() => setError('Failed to fetch menu'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSelect = (item) => {
    setSelectedItems(prev =>
      prev.some(i => i._id === item._id)
        ? prev.filter(i => i._id !== item._id)
        : [...prev, item]
    );
  };

  const handleReserve = (e) => {
    e.preventDefault();
    setReserveError('');
    // Validate date and time
    const selectedDateTime = new Date(`${reserveDetails.date}T${reserveDetails.time}`);
    if (!reserveDetails.date || !reserveDetails.time) {
      setReserveError('Please select both date and time.');
      return;
    }
    if (selectedDateTime < now) {
      setReserveError('Date and time must be in the future.');
      return;
    }
    setShowReserveModal(false);
    alert(`Booking reserved for ${reserveDetails.name} on ${reserveDetails.date} at ${reserveDetails.time} for ${reserveDetails.seats} seats.`);
    setReserveDetails({ date: '', time: '', seats: '', name: '', phone: '' });
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handleConfirmOrder = () => {
    setShowCheckoutModal(false);
    setOrderConfirmed(true);
    setSelectedItems([]);
    setTimeout(() => setOrderConfirmed(false), 4000);
  };

  const total = selectedItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px #e3f0ff', padding: 40, minHeight: 500, position: 'relative' }}>
      {/* Reserve Booking Button */}
      <button
        style={{ position: 'absolute', top: 32, right: 40, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, padding: '10px 24px', cursor: 'pointer', zIndex: 2 }}
        onClick={() => setShowReserveModal(true)}
      >
        Reserve Booking
      </button>
      <h2 style={{ color: '#1976d2', marginBottom: 24, textAlign: 'center' }}>Restaurant Menu</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {menu.length === 0 && !loading && <p>No menu items found.</p>}
        {menu.map(item => (
          <div key={item._id} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee', padding: '12px 0' }}>
            <img
              src={item.image ? `http://localhost:3001/uploads/${item.image}` : '/No_Image_Available.jpg'}
              alt={item.name}
              style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 6, marginRight: 18 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>{item.name}</div>
              <div style={{ color: '#888', fontSize: 15 }}>{item.category}</div>
            </div>
            <div style={{ width: 80, textAlign: 'right', fontWeight: 500 }}>${item.price}</div>
            <input
              type="checkbox"
              checked={selectedItems.some(i => i._id === item._id)}
              onChange={() => handleSelect(item)}
              style={{ marginLeft: 18 }}
            />
          </div>
        ))}
      </div>
      {menu.length > 0 && (
        <button
          onClick={handleCheckout}
          style={{ marginTop: 32, padding: '12px 32px', background: selectedItems.length ? '#1976d2' : '#aaa', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 18, cursor: selectedItems.length ? 'pointer' : 'not-allowed' }}
          disabled={selectedItems.length === 0}
        >
          Checkout
        </button>
      )}

      {/* Reserve Modal */}
      {showReserveModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={handleReserve} style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 340, boxShadow: '0 2px 16px #1976d233', position: 'relative' }}>
            <button type="button" onClick={() => setShowReserveModal(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }}>&times;</button>
            <h3 style={{ color: '#1976d2', marginBottom: 18 }}>Reserve Booking</h3>
            {reserveError && <div style={{ color: 'red', marginBottom: 10 }}>{reserveError}</div>}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontWeight: 500 }}>Date:</label>
              <input
                type="date"
                value={reserveDetails.date}
                min={todayStr}
                onChange={e => setReserveDetails(d => ({ ...d, date: e.target.value, time: '' }))}
                required
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #b6c6e3', marginTop: 4 }}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontWeight: 500 }}>Time:</label>
              <input
                type="time"
                value={reserveDetails.time}
                min={reserveDetails.date === todayStr ? currentTimeStr : undefined}
                onChange={e => setReserveDetails(d => ({ ...d, time: e.target.value }))}
                required
                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #b6c6e3', marginTop: 4 }}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontWeight: 500 }}>Number of Seats:</label>
              <input type="number" min="1" value={reserveDetails.seats} onChange={e => setReserveDetails(d => ({ ...d, seats: e.target.value }))} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #b6c6e3', marginTop: 4 }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontWeight: 500 }}>Your Name:</label>
              <input type="text" value={reserveDetails.name} onChange={e => setReserveDetails(d => ({ ...d, name: e.target.value }))} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #b6c6e3', marginTop: 4 }} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 500 }}>Phone Number:</label>
              <input type="tel" value={reserveDetails.phone} onChange={e => setReserveDetails(d => ({ ...d, phone: e.target.value }))} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #b6c6e3', marginTop: 4 }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px 0', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer', marginTop: 10 }}>Book</button>
          </form>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 340, boxShadow: '0 2px 16px #1976d233', position: 'relative' }}>
            <button type="button" onClick={() => setShowCheckoutModal(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }}>&times;</button>
            <h3 style={{ color: '#1976d2', marginBottom: 18 }}>Order Summary</h3>
            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
              {selectedItems.map(item => (
                <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
            <div style={{ borderTop: '1px solid #eee', margin: '16px 0' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: 18 }}>
              <span>Total</span>
              <span>${total}</span>
            </div>
            <button onClick={handleConfirmOrder} style={{ width: '100%', padding: '12px 0', background: '#388e3c', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer', marginTop: 18 }}>Confirm Order</button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {orderConfirmed && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.2)', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 340, boxShadow: '0 2px 16px #1976d233', textAlign: 'center' }}>
            <h3 style={{ color: '#388e3c', marginBottom: 18 }}>Order Confirmed!</h3>
            <p style={{ fontSize: 17, color: '#333', marginBottom: 12 }}>You can pick your order from the branch.</p>
            <button onClick={() => setOrderConfirmed(false)} style={{ marginTop: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, padding: '8px 24px', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantMenu; 