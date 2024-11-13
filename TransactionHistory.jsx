import React, { useContext } from 'react';
import TransactionContext from '../context/TransactionContext'; // Import Transaction Context
import './TransactionHistory.css';

const TransactionHistory = () => {
  const { transactions } = useContext(TransactionContext); // Access transactions

  return (
    <div className="transaction-history-container">
      <h2>Transaction History</h2>
      {transactions.length > 0 ? (
        <div className="transaction-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No transactions found</p>
      )}
    </div>
  );
};

export default TransactionHistory;
