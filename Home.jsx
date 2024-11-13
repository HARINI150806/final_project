import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import TransactionContext from '../context/TransactionContext';
import { FaUserCircle } from 'react-icons/fa';
import AccountAndTransactionHistory from './AccountAndTransactionHistory';
import './Home.css';

const Home = () => {
  const { transactions, addTransaction, deleteTransaction, categories, addCategory, deleteCategory } = useContext(TransactionContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');
  const [budgetUsed, setBudgetUsed] = useState(0);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  // Handle adding a transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: transactions.length + 1,
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString(),
    };
    addTransaction(newTransaction);
    setDescription('');
    setAmount('');
    setCategory('');
    setBudgetUsed(budgetUsed + parseFloat(amount));
  };

  // Budget monitoring logic
  const handleSetBudget = (e) => {
    e.preventDefault();
    setBudgetLimit(parseFloat(budgetLimit));
  };

  // Handle deleting a transaction
  const handleDeleteTransaction = (id) => {
    const transactionToDelete = transactions.find((transaction) => transaction.id === id);
    if (transactionToDelete) {
      setBudgetUsed(budgetUsed - transactionToDelete.amount);
    }
    deleteTransaction(id);
  };

  // Handle adding a new category
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (category.trim()) {
      addCategory(category.trim());
      setCategory('');
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = (categoryToDelete) => {
    deleteCategory(categoryToDelete);
  };

  const remainingBudget = budgetLimit - budgetUsed;
  const totalProfit = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const extraSpent = budgetUsed - budgetLimit > 0 ? budgetUsed - budgetLimit : 0;
  const profit = totalProfit - extraSpent;

  const metrics = {
    totalIncome: transactions.reduce((acc, transaction) => transaction.amount > 0 ? acc + transaction.amount : acc, 0),
    totalExpenses: transactions.reduce((acc, transaction) => transaction.amount < 0 ? acc + Math.abs(transaction.amount) : acc, 0),
    profit,
    cashFlow: totalProfit,
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">Profit Pulse</div>
        <nav className="nav">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <FaUserCircle
            size={32}
            style={{ cursor: 'pointer', marginLeft: '20px' }}
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
          />
        </nav>
      </header>

      {/* Account and Transaction History Dropdown */}
      <AccountAndTransactionHistory showMenu={showAccountDropdown} />

      <div className="home-content">
        <h1>Welcome to Your Accounting Dashboard</h1>

        <section id="home" className="dashboard-overview">
          <h2>Dashboard Overview</h2>
          <div className="metrics">
            <div className="metric-item">
              <h3>Total Income</h3>
              <p>${metrics.totalIncome}</p>
            </div>
            <div className="metric-item">
              <h3>Total Expenses</h3>
              <p>${metrics.totalExpenses}</p>
            </div>
            <div className="metric-item">
              <h3>Profit/Loss</h3>
              <p style={{ color: metrics.profit < 0 ? 'red' : 'white' }}>
                ${metrics.profit}
              </p>
            </div>
            <div className="metric-item">
              <h3>Cash Flow</h3>
              <p>${metrics.cashFlow}</p>
            </div>
          </div>
        </section>

        <section className="add-transaction">
          <h2>Add New Transaction</h2>
          <form onSubmit={handleAddTransaction}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
            <button type="submit">Add Transaction</button>
          </form>
        </section>

        <section className="budget-monitoring">
          <h2>Monitor Your Budget</h2>
          <form onSubmit={handleSetBudget}>
            <input 
              type="number"
              placeholder="Set Budget Limit"
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(e.target.value)}
              required
            />
            <button type="submit" style={{ color: 'black' }}>Set Budget</button>
          </form>

          <div className="budget-status">
            <h3>Budget Limit: ${budgetLimit}</h3>
            <h3>Budget Used: ${budgetUsed}</h3>
            <h3>
              Remaining Budget: <span style={{ color: remainingBudget < 0 ? 'red' : 'white' }}>
                ${remainingBudget}
              </span>
            </h3>
            {remainingBudget < 0 && <p style={{ color: 'red' }}>Warning: You have exceeded your budget!</p>}
          </div>
        </section>

        <section className="category-management">
          <h2>Manage Categories</h2>
          <form onSubmit={handleAddCategory}>
            <input
              type="text"
              placeholder="New Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <button type="submit">Add Category</button>
          </form>
          <ul>
            {categories.map((cat, index) => (
              <li key={index}>
                {cat} <button onClick={() => handleDeleteCategory(cat)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>

        <section className="recent-transactions">
          <h2>Recent Transactions</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount > 0 ? `$${transaction.amount}` : `-$${Math.abs(transaction.amount)}`}</td>
                  <td>{transaction.category}</td>
                  <td>
                    <button onClick={() => handleDeleteTransaction(transaction.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Home;
