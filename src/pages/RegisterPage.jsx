import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function RegisterPage({ setIsAuthenticated, setToken, setRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:5001/api/auth/register', { email, password });
      const token = res.data.token;
      console.log('Register successful, token:', token);
      if (token) {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setToken(token);
        setIsAuthenticated(true);
        setRole(decoded.role);
      } else {
        console.log('No token received');
      }
    } catch (err) {
      console.error('Register error:', err.response ? err.response.data : err);
      alert('Registration failed');
    }
  };

  return (
    <>
      
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="input-group">
          <span className="input-icon">🧑</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
        <button type="submit">Register</button>
        <a href="/login" className="create-account">Already have an account? Login</a>
      </form>
    </>
  );
}

export default RegisterPage;