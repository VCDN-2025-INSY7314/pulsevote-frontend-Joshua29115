import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';  // Add this import for navigation

function LoginPage({ setIsAuthenticated, setToken, setRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Add this for redirect

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:5001/api/auth/login', { email, password });
      const token = res.data.token;
      console.log('Login successful, token:', token);
      if (token) {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setToken(token);
        setIsAuthenticated(true);
        setRole(decoded.role);
        navigate('/dashboard');  // Add this line to redirect immediately after login
      } else {
        console.log('No token received');
      }
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err);
      alert('Login failed');
    }
  };

  return (
    <>
      
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <a href="#" className="forgot-password">Forgot Password</a>
        <button type="submit">Login</button>
        <a href="/register" className="create-account">Create New Account</a>
      </form>
    </>
  );
}

export default LoginPage;