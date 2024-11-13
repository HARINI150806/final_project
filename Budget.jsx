import React, { useContext, useState, useEffect } from 'react';
import TransactionContext from '../context/TransactionContext'; // Import the context

const BudgetMonitoring = () => {
  const { transactions } = useContext(TransactionContext);
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // Monitor spending by category and compare it to the budget
  useEffect(() => {
    const totalSpending = transactions
      .filter(transaction => transaction.description.includes(category))
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    if (totalSpending > budget) {
      setAlertMessage(`Alert: You have exceeded your budget of $${budget} for ${category}!`);
    } else if (totalSpending >= budget * 0.8) {
      setAlertMessage(`Warning: You have spent 80% of your budget for ${category}.`);
    } else {
      setAlertMessage('');
    }
  }, [transactions, budget, category]);

  const handleAddBudget = (e) => {
    e.preventDefault();
    setAlertMessage(''); // Reset message
  };

  return (
    <div>
      <h2>Set Budget</h2>
      <form onSubmit={handleAddBudget}>
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
        <button type="submit">Set Budget</button>
      </form>

      {alertMessage && <p>{alertMessage}</p>}
    </div>
  );
};

export default BudgetMonitoring;
