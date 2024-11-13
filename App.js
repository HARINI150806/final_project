import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { TransactionProvider } from './context/TransactionContext';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Manage from './components/Manage';
import AccountAndTransactionHistory from './components/AccountAndTransactionHistory';
import TransactionHistory from './components/TransactionHistory'; // Import Transaction History

const App = () => (
  <UserProvider>
    <TransactionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/account" element={<AccountAndTransactionHistory />} />
          <Route path="/transaction-history" element={<TransactionHistory />} /> {/* New Transaction History route */}
        </Routes>
      </Router>
    </TransactionProvider>
  </UserProvider>
);

export default App;
