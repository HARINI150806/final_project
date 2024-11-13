import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './AccountAndTransactionHistory.css';

const AccountAndTransactionHistory = ({ showMenu, transactions = [] }) => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleTransactionHistory = () => {
    navigate('/transaction-history');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    showMenu && (
      <div className="dropdown-menu">
        <div className="dropdown-item-box" onClick={handleTransactionHistory}>
          Transaction History
        </div>
        <div className="dropdown-item-box" onClick={handleLogout}>
          Logout
       </div>
       </div>

       )
  );
};

export default AccountAndTransactionHistory;
