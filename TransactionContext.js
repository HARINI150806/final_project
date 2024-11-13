import React, { createContext, useState } from 'react';

// Create the context
const TransactionContext = createContext();

// Create a provider component
export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]); // New state for categories

  // Add a new transaction
  const addTransaction = (transaction) => {
    setTransactions(prevTransactions => [...prevTransactions, transaction]); // Using functional form
  };

  // Delete a transaction by its ID
  const deleteTransaction = (id) => {
    setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== id));
  };

  // Add a new category
  const addCategory = (category) => {
    setCategories(prevCategories => [...prevCategories, category]); // Using functional form
  };

  // Delete a category
  const deleteCategory = (category) => {
    setCategories(prevCategories => prevCategories.filter(cat => cat !== category)); // Using functional form
    // Remove transactions belonging to the deleted category
    setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.category !== category));
  };

  // Provide the context values
  return (
    <TransactionContext.Provider 
      value={{ 
        transactions, 
        addTransaction, 
        deleteTransaction, 
        categories, 
        addCategory, 
        deleteCategory 
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

// Export the context and provider
export default TransactionContext;
