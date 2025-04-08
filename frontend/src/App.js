import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    occupation: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message || data.error);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #06beb6, #48b1bf)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      <div style={{
        background: '#ffffff',
        padding: '2rem',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {Object.entries(form).map(([key, val]) => (
            <div key={key} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type={key === 'password' ? 'password' : 'text'}
                name={key}
                value={val}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  outlineColor: '#48b1bf'
                }}
              />
            </div>
          ))}
          <button type="submit" style={{
            width: '100%',
            padding: '0.75rem',
            background: '#48b1bf',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
