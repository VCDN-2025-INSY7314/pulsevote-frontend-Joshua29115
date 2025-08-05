import { Link } from 'react-router-dom';

function NavBar({ isAuthenticated, onLogout }) {
  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <span className="nav-logo">PulseVote</span>
        <Link to="/" className="nav-link">Home</Link>
      </div>
      <div className="nav-right">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <button onClick={onLogout} className="nav-button">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;