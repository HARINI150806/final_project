import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-message">
        <h1>Welcome, Manage your transactions</h1>
        <button className="home-button" onClick={goToLoginPage}>
         Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;
