import React, { useEffect, useState } from 'react';

function ViewRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line
  }, []);

  const fetchRestaurants = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:3001/api/getBranches');
      const data = await res.json();
      setRestaurants(data);
    } catch (err) {
      setError('Failed to fetch restaurants');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ color: '#1976d2', marginBottom: 24 }}>All Restaurants</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {restaurants.map(r => (
          <div key={r._id || r.id} style={{ width: 280, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #e3f0ff', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={r.image ? `http://localhost:3001/uploads/${r.image}` : '../../../public/No_Image_Available.jpg'}
              alt={r.name}
              style={{ width: 220, height: 120, objectFit: 'contain', borderRadius: 8, marginBottom: 12 }}
            />
            <h3 style={{ color: '#1976d2', marginBottom: 8 }}>{r.name}</h3>
            <p style={{ color: '#555', marginBottom: 4 }}>{r.address}</p>
            <p style={{ color: '#888', fontSize: 15 }}>{r.cuisines && r.cuisines.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewRestaurants; 