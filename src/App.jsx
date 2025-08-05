import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LogoutPage from './pages/LogoutPage';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);  // Added role state

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      const decoded = jwtDecode(storedToken);
      setRole(decoded.role);  // Set role from stored token on load
    }
  }, []);

  return (
    <div>
      <NavBar isAuthenticated={isAuthenticated} onLogout={() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setToken(null);
        setRole(null);  // Clear role on logout
      }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setToken={setToken} setRole={setRole} />} />  
        <Route path="/register" element={<RegisterPage setIsAuthenticated={setIsAuthenticated} setToken={setToken} setRole={setRole} />} />  
        <Route path="/logout" element={<LogoutPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardPage token={token} role={role} />  
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;