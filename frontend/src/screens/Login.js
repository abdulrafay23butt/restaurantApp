import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const roles = ['Customer', 'Manager', 'Admin'];

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(roles[0]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    alert(`Logging in as ${role}`);
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Role:</label>
          {roles.map(r => (
            <label key={r} style={{ marginLeft: 10 }}>
              <input
                type="radio"
                value={r}
                checked={role === r}
                onChange={() => setRole(r)}
                name="role"
              />
              {r}
            </label>
          ))}
        </div>
        <button type="submit">Login</button>
      </form>
      <button className={styles.switchBtn} onClick={() => navigate('/signup')}>
        Don't have an account? Signup
      </button>
    </div>
  );
}

export default Login; 