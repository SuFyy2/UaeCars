// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      const user = response.data.user;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(user));
      alert('Login successful!');

      if (user.email === 'sufiyan@gmail.com') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch {
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p style={{ marginTop: '20px' }}>
        New user? <button onClick={() => navigate('/register')} style={styles.linkButton}>Register here</button>
      </p>
    </div>
  );
};

const styles = {
  container: { maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'left' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  inputGroup: { display: 'flex', flexDirection: 'column' },
  input: { padding: '8px', fontSize: '16px' },
  button: { padding: '10px', backgroundColor: '#1976d2', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px' },
  linkButton: { background: 'none', border: 'none', color: '#1976d2', cursor: 'pointer', textDecoration: 'underline', fontSize: '14px' },
  error: { color: 'red' },
};

export default Login;
