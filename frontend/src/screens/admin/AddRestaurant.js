import React, { useState } from 'react';
import Swal from 'sweetalert2';

const CUISINE_OPTIONS = [
  'Italian', 'Chinese', 'Indian', 'Mexican', 'American', 'Thai', 'Japanese', 'French', 'Mediterranean', 'Other'
];

function AddRestaurant() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cuisines, setCuisines] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
  };

  const handleCuisineChange = (e) => {
    const value = e.target.value;
    setCuisines(prev =>
      prev.includes(value)
        ? prev.filter(c => c !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the data to the backend, including the image file and cuisines array
    Swal.fire({
      icon: 'success',
      title: 'Restaurant Added',
      text: 'The restaurant has been added successfully!',
      timer: 2000,
      showConfirmButton: false,
    });
    setName('');
    setAddress('');
    setCuisines([]);
    setImage(null);
    setImagePreview('');
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 32 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Add Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500 }}>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: 10, marginTop: 6, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500 }}>Address:</label>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} required style={{ width: '100%', padding: 10, marginTop: 6, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500, display: 'block', marginBottom: 6 }}>Cuisine(s):</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {CUISINE_OPTIONS.map(option => (
              <label key={option} style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 400, background: cuisines.includes(option) ? '#e3f2fd' : '#f5f5f5', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  value={option}
                  checked={cuisines.includes(option)}
                  onChange={handleCuisineChange}
                  style={{ accentColor: '#1976d2' }}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 500 }}>Image (optional):</label>
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'block', marginTop: 6 }} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" style={{ marginTop: 12, maxWidth: '100%', maxHeight: 180, borderRadius: 8, boxShadow: '0 1px 6px #ccc' }} />
          )}
        </div>
        <button type="submit" style={{ width: '100%', padding: '12px 0', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, fontWeight: 600, cursor: 'pointer', marginTop: 10, boxShadow: '0 1px 4px #1976d233' }}>Add Restaurant</button>
      </form>
    </div>
  );
}

export default AddRestaurant; 