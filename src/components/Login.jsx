import { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    console.log('Submitting login with', { email, password });
    try {
      const res = await axios.post('https://localhost:5001/api/auth/login', { email, password });
      console.log('Login response:', res.data);
      if (res.data.token) {
        onLogin(res.data.token);
      } else {
        console.log('No token in response');
      }
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <span className="input-icon">🧑</span>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="User Name"
          required
        />
      </div>
      <div className="input-group">
        <span className="input-icon">🔒</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <a href="#" className="forgot-password">Forgot Password</a>
      <button type="submit">Login</button>
      <a href="/register" className="create-account">Create New Account</a>
    </form>
  );
}

export default Login;