/*import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header style={{ padding: '10px', backgroundColor: '#f4f4f4', borderBottom: '1px solid #ddd' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Accounting System</h1>
        <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
          {isAuthenticated ? (
            <>
              <li style={{ margin: '0 10px' }}>
                <Link to="/home" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
              </li>
              <li style={{ margin: '0 10px' }}>
                <Link to="/about" style={{ textDecoration: 'none', color: '#333' }}>About</Link>
              </li>
              <li style={{ margin: '0 10px' }}>
                <Link to="/contact" style={{ textDecoration: 'none', color: '#333' }}>Contact</Link>
              </li>
              <li style={{ margin: '0 10px' }}>
                <button onClick={onLogout} style={{ textDecoration: 'none', color: '#333' }}>Logout</button>
              </li>
            </>
          ) : (
            <li style={{ margin: '0 10px' }}>
              <Link to="/login" style={{ textDecoration: 'none', color: '#333' }}>Login/Signup</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
*/
