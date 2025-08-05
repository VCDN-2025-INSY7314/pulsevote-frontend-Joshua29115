import { useState } from 'react';
import axios from 'axios';

function Register({ onRegister }) {

    console.log('Register component rendering');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:5001/api/auth/register', { email, password });
      onRegister(res.data.token);
    } catch (err) {
  console.error(err.response ? err.response.data : err);  // Log the full error details
  alert('Registration failed');
}
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;