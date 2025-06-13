import React, { useState } from 'react';

const dummyRestaurants = [
  { id: 1, name: 'Pizza Palace', address: '123 Main St', cuisines: ['Italian', 'American'] },
  { id: 2, name: 'Sushi World', address: '456 Ocean Ave', cuisines: ['Japanese'] },
  { id: 3, name: 'Curry House', address: '789 Spice Rd', cuisines: ['Indian'] },
];

function ManageRestaurants() {
  const [restaurants, setRestaurants] = useState(dummyRestaurants);

  const handleDelete = (id) => {
    setRestaurants(restaurants.filter(r => r.id !== id));
  };

  const handleEdit = (id) => {
    // Placeholder for edit logic
    alert('Edit restaurant with id: ' + id);
  };

  return (
    <div>
      <h2>Manage Restaurants</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            <th style={{ padding: 10, border: '1px solid #eee' }}>Name</th>
            <th style={{ padding: 10, border: '1px solid #eee' }}>Address</th>
            <th style={{ padding: 10, border: '1px solid #eee' }}>Cuisines</th>
            <th style={{ padding: 10, border: '1px solid #eee' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map(r => (
            <tr key={r.id}>
              <td style={{ padding: 10, border: '1px solid #eee' }}>{r.name}</td>
              <td style={{ padding: 10, border: '1px solid #eee' }}>{r.address}</td>
              <td style={{ padding: 10, border: '1px solid #eee' }}>{r.cuisines.join(', ')}</td>
              <td style={{ padding: 10, border: '1px solid #eee' }}>
                <button onClick={() => handleEdit(r.id)} style={{ marginRight: 8, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(r.id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageRestaurants; 