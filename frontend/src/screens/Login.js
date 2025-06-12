import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const roles = ['Customer', 'Manager', 'Admin'];

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(roles[0]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    alert(`Logging in as ${role}`);
  };

  return (
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
  );
}

export default Login; 