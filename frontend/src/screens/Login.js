import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Swal from 'sweetalert2';
import { ClipLoader } from 'react-spinners';
import { useAuth } from '../context/AuthContext.js';

const roles = ['Customer', 'Manager', 'Admin'];

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(roles[0]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setLoading(false);

      Swal.fire({
        icon: 'success',
        title: "Success",
        text: "Login Successful",
        timer: 2000,
        showConfirmButton: false,
      })

      // Store token in localStorage for authentication
      login(data.token);

      // Redirect based on role
      if (role === 'Customer') {
        navigate('/dashboard/customer');
      } else if (role === 'Admin') {
        navigate('/dashboard/admin');
      } else if (role === 'Manager') {
        navigate('/dashboard/manager');
      }

      console.log('login successful:', data);
      // You can redirect or show success message here
    } catch (error) {
      console.error('Error during login:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message,
        showConfirmButton: false,
        timer:2000
      });

    }
    finally {
      setLoading(false);

    }
  };

  return (
    <>
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <ClipLoader color="#ffffff" />
        </div>
      )}
      <div className={styles.loginBg}>
        <div className={styles.loginContainer}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email:</label>
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div>
              <label>Role:</label>
              <select value={role} onChange={e => setRole(e.target.value)}>
                {roles.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <button type="submit">Login</button>
          </form>
          <button className={styles.switchBtn} onClick={() => navigate('/signup')}>
            Don't have an account? Signup
          </button>
        </div>
      </div>
    </>
  );
}

export default Login; 