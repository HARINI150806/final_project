import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const Manage = () => {
  const [totalIncome, setTotalIncome] = useState('');
  const [homePercentage, setHomePercentage] = useState('');
  const [workPercentage, setWorkPercentage] = useState('');
  const [investmentPercentage, setInvestmentPercentage] = useState('');

  const [homeExpenses, setHomeExpenses] = useState(0);
  const [workExpenses, setWorkExpenses] = useState(0);
  const [investmentExpenses, setInvestmentExpenses] = useState(0);

  // Calculate budget limits based on percentages
  const homeBudget = (totalIncome * (homePercentage / 100)) || 0;
  const workBudget = (totalIncome * (workPercentage / 100)) || 0;
  const investmentBudget = (totalIncome * (investmentPercentage / 100)) || 0;

  const handleHomeExpenseChange = (e) => {
    const amount = parseFloat(e.target.value);
    setHomeExpenses(amount);

    if (amount > homeBudget) {
      alert('Warning: Home expenses exceed the allowed budget!');
    }
  };

  const handleWorkExpenseChange = (e) => {
    const amount = parseFloat(e.target.value);
    setWorkExpenses(amount);

    if (amount > workBudget) {
      alert('Warning: Work expenses exceed the allowed budget!');
    }
  };

  const handleInvestmentExpenseChange = (e) => {
    const amount = parseFloat(e.target.value);
    setInvestmentExpenses(amount);

    if (amount > investmentBudget) {
      alert('Warning: Investment expenses exceed the allowed budget!');
    }
  };

  // Function to store expenses in db.json
  const saveExpenses = async () => {
    const totalExpenses = {
      homeExpenses,
      workExpenses,
      investmentExpenses,
      total: homeExpenses + workExpenses + investmentExpenses
    };

    try {
      await axios.post('http://localhost:3003/expenses', totalExpenses);
      alert('Expenses saved successfully!');
    } catch (error) {
      console.error('Error saving expenses:', error);
      alert('Error saving expenses');
    }
  };

  return (
    <div className="manage-container">
      <style>
        {`
         body::before {
            color:##028090;
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url('https://wallpaperaccess.com/full/732220.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            z-index: -1;
          }
         .manage-container {
            padding-top: 90px;
            max-width: 700px;
            margin: 60px auto;
            padding: 30px;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

         h1 {
           text-align: center;
           color: #028090;
         }

         .box {
           padding: 20px;
           background-color: #dcdcdc; /* Darkened box color */
           border-radius: 8px;
           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
           margin-bottom: 30px;
         }

         .income-input, .budget-inputs, .expenses-section {
           margin: 20px 0;
         }

         .income-input h2, .budget-inputs h2, .expenses-section h2 {
           color:#000;
         }

         .percentage-inputs {
           margin-bottom: 15px;
         }

         input[type="number"] {
           width: 100%;
           padding: 10px;
           border: 1px solid #ccc;
           border-radius: 4px;
           margin-top: 5px;
           box-sizing: border-box;
         }

         input[type="number"]:focus {
           border-color: #007BFF;
           outline: none;
         }

         .expenses-section div {
           margin-bottom: 15px;
         }

         p {
           font-size: 14px;
           margin: 5px 0;
           color:#5e6472;
         }

         p[style*="red"] {
           font-weight: bold;
           color: red;
         }

         button {
           padding: 10px 15px;
           background-color: #007BFF;
           color: white;
           border: none;
           border-radius: 4px;
           cursor: pointer;
           transition: background-color 0.3s;
         }

         button:hover {
           background-color: #0056b3;
         }

         .nav {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
  border-radius: 5px;
  padding: 10px;
  z-index: 3; /* Higher z-index to appear above everything */
  display: flex;
  gap: 20px;
  flex-direction: row;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
}

.nav-link:hover {
  text-decoration: underline;
}

         @media (max-width: 768px) {
           .manage-container {
             padding: 15px;
           }

           input[type="number"] {
             font-size: 16px;
           }

           h2 {
             font-size: 1.5rem;
           }
         }
        `}
      </style>

      <nav className="nav">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>

      <h1>Manage Your Finances</h1>

      {/* Income Input Section */}
      <div className="box income-input">
        <h2>Enter Total Income</h2>
        <input
          type="number"
          placeholder="Total Income"
          value={totalIncome}
          onChange={(e) => setTotalIncome(e.target.value)}
          required
        />
      </div>

      {/* Budget Inputs Section */}
      <div className="box budget-inputs">
        <h2>Set Percentage for Each Category</h2>

        <div className="percentage-inputs">
          <h3>Home Percentage</h3>
          <input
            type="number"
            placeholder="Home Percentage"
            value={homePercentage}
            onChange={(e) => setHomePercentage(e.target.value)}
            required
          />
        </div>

        <div className="percentage-inputs">
          <h3>Work Percentage</h3>
          <input
            type="number"
            placeholder="Work Percentage"
            value={workPercentage}
            onChange={(e) => setWorkPercentage(e.target.value)}
            required
          />
        </div>

        <div className="percentage-inputs">
          <h3>Investment Percentage</h3>
          <input
            type="number"
            placeholder="Investment Percentage"
            value={investmentPercentage}
            onChange={(e) => setInvestmentPercentage(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Expenses Section */}
      <div className="box expenses-section">
        <h2>Expenses</h2>

        <div>
          <h3>Home Expenses</h3>
          <input
            type="number"
            placeholder="Enter Home Expenses"
            onChange={handleHomeExpenseChange}
          />
          <p style={{ color: homeExpenses > homeBudget ? 'red' : 'black' }}>
            Total Home Expenses: ${homeExpenses} (Budget: ${homeBudget})
          </p>
        </div>

        <div>
          <h3>Work Expenses</h3>
          <input
            type="number"
            placeholder="Enter Work Expenses"
            onChange={handleWorkExpenseChange}
          />
          <p style={{ color: workExpenses > workBudget ? 'red' : 'black' }}>
            Total Work Expenses: ${workExpenses} (Budget: ${workBudget})
          </p>
        </div>

        <div>
          <h3>Investment Expenses</h3>
          <input
            type="number"
            placeholder="Enter Investment Expenses"
            onChange={handleInvestmentExpenseChange}
          />
          <p style={{ color: investmentExpenses > investmentBudget ? 'red' : 'black' }}>
            Total Investment Expenses: ${investmentExpenses} (Budget: ${investmentBudget})
          </p>
        </div>

        {/* Save button */}
        <button onClick={saveExpenses}>Save Expenses</button>
      </div>
    </div>
  );
};

export default Manage;
