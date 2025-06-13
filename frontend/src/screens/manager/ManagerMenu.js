import React, { useState } from 'react';

const initialMenu = [
  { id: 1, name: 'Margherita Pizza', price: 12, category: 'Pizza', image: '' },
  { id: 2, name: 'Spaghetti Carbonara', price: 15, category: 'Pasta', image: '' },
  { id: 3, name: 'Caesar Salad', price: 9, category: 'Salad', image: '' },
];

function ManagerMenu() {
  const [menu, setMenu] = useState(initialMenu);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({ name: '', price: '', category: '', image: '', imagePreview: '' });

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

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !price || !category) return;
    setMenu([
      ...menu,
      { id: Date.now(), name, price: parseFloat(price), category, image: imagePreview },
    ]);
    setName('');
    setPrice('');
    setCategory('');
    setImage(null);
    setImagePreview('');
  };

  const handleDelete = (id) => {
    setMenu(menu.filter(item => item.id !== id));
  };

  const handleEditClick = (item) => {
    setEditId(item.id);
    setEditFields({
      name: item.name,
      price: item.price,
      category: item.category,
      image: '',
      imagePreview: item.image,
    });
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setEditFields(prev => ({ ...prev, image: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFields(prev => ({ ...prev, imagePreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSave = (id) => {
    setMenu(menu.map(item =>
      item.id === id
        ? {
            ...item,
            name: editFields.name,
            price: parseFloat(editFields.price),
            category: editFields.category,
            image: editFields.imagePreview,
          }
        : item
    ));
    setEditId(null);
    setEditFields({ name: '', price: '', category: '', image: '', imagePreview: '' });
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', background: 'linear-gradient(120deg, #f8fafc 0%, #e3f0ff 100%)', padding: '40px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 32px rgba(25, 118, 210, 0.08)', padding: 40, minHeight: 700 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 32, color: '#1976d2', marginBottom: 8, letterSpacing: 1 }}>Menu Management</h2>
          <p style={{ color: '#555', fontSize: 18 }}>Add, edit, or remove menu items for your branch. Upload images for a more appealing menu!</p>
        </div>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: 20, marginBottom: 36, background: '#f5faff', padding: 24, borderRadius: 12, boxShadow: '0 1px 8px #e3f0ff', alignItems: 'flex-end' }}>
          <div style={{ flex: 2,paddingRight: 10 }}>
            <label style={{ fontWeight: 500 }}>Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #b6c6e3', marginTop: 4, background: '#fafdff' }} />
          </div>
          <div style={{ flex: 1,paddingRight: 10  }}>
            <label style={{ fontWeight: 500 }}>Price ($)</label>
            <input type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #b6c6e3', marginTop: 4, background: '#fafdff' }} />
          </div>
          <div style={{ flex: 1,paddingRight: 10  }}>
            <label style={{ fontWeight: 500 }}>Category</label>
            <input type="text" value={category} onChange={e => setCategory(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #b6c6e3', marginTop: 4, background: '#fafdff' }} />
          </div>
          <div style={{ flex: 1}}>
            <label style={{ fontWeight: 500, }}>Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: '100%', marginTop: 4 }} />
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ marginTop: 6, maxWidth: 40, maxHeight: 40, borderRadius: 4, boxShadow: '0 1px 4px #b6c6e3' }} />}
          </div>
          <button type="submit" style={{ padding: '12px 28px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 18, cursor: 'pointer', height: 48, boxShadow: '0 1px 4px #1976d233' }}>Add</button>
        </form>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, boxShadow: '0 1px 8px #e3f0ff' }}>
            <thead>
              <tr style={{ background: '#e3f0ff' }}>
                <th style={{ padding: 14, border: '1px solid #e3f0ff' }}>Image</th>
                <th style={{ padding: 14, border: '1px solid #e3f0ff' }}>Name</th>
                <th style={{ padding: 14, border: '1px solid #e3f0ff' }}>Price ($)</th>
                <th style={{ padding: 14, border: '1px solid #e3f0ff' }}>Category</th>
                <th style={{ padding: 14, border: '1px solid #e3f0ff' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menu.map(item => (
                <tr key={item.id} style={{ background: editId === item.id ? '#fafdff' : '#fff' }}>
                  <td style={{ padding: 12, border: '1px solid #e3f0ff', textAlign: 'center' }}>
                    {item.image && <img src={item.image} alt={item.name} style={{ maxWidth: 60, maxHeight: 48, borderRadius: 6, boxShadow: '0 1px 4px #b6c6e3' }} />}
                  </td>
                  {editId === item.id ? (
                    <>
                      <td style={{ padding: 12, border: '1px solid #e3f0ff' }}>
                        <input type="text" value={editFields.name} onChange={e => setEditFields(f => ({ ...f, name: e.target.value }))} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #b6c6e3' }} />
                      </td>
                      <td style={{ padding: 12, border: '1px solid #e3f0ff' }}>
                        <input type="number" min="0" step="0.01" value={editFields.price} onChange={e => setEditFields(f => ({ ...f, price: e.target.value }))} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #b6c6e3' }} />
                      </td>
                      <td style={{ padding: 12, border: '1px solid #e3f0ff' }}>
                        <input type="text" value={editFields.category} onChange={e => setEditFields(f => ({ ...f, category: e.target.value }))} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #b6c6e3' }} />
                      </td>
                      <td style={{ padding: 12, border: '1px solid #e3f0ff' }}>
                        <input type="file" accept="image/*" onChange={handleEditImageChange} />
                        {editFields.imagePreview && <img src={editFields.imagePreview} alt="Preview" style={{ marginTop: 6, maxWidth: 60, maxHeight: 48, borderRadius: 6, boxShadow: '0 1px 4px #b6c6e3' }} />}
                        <div style={{ marginTop: 8 }}>
                          <button onClick={() => handleEditSave(item.id)} style={{ background: '#388e3c', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', cursor: 'pointer', marginRight: 8, fontWeight: 500 }}>Save</button>
                          <button onClick={() => setEditId(null)} style={{ background: '#aaa', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', cursor: 'pointer', fontWeight: 500 }}>Cancel</button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ padding: 12, border: '1px solid #e3f0ff' }}>{item.name}</td>
                      <td style={{ padding: 12, border: '1px solid #e3f0ff' }}>{item.price.toFixed(2)}</td>
                      <td style={{ padding: 12, border: '1px solid #e3f0ff' }}>{item.category}</td>
                      <td style={{ padding: 12, border: '1px solid #e3f0ff' }}>
                        <button onClick={() => handleEditClick(item)} style={{ marginRight: 8, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', cursor: 'pointer', fontWeight: 500 }}>Edit</button>
                        <button onClick={() => handleDelete(item.id)} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', cursor: 'pointer', fontWeight: 500 }}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManagerMenu; 