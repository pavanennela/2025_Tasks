// Import necessary libraries and components
import React, { useEffect, useState } from "react"; // React library and hooks
import styled from "styled-components"; // For styled-components
import HomeComponent from "./modules/home"; // Main HomeComponent

// Styled-component: Main container
const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
  align-items: center;
  height: 100%;
  width: 98%;
  padding-top: 30px;
  font-family: Montserrat;
`;

// Styled-component: Header section
const Header = styled.div`
  color: rgb(33, 55, 76);
  text-decoration: underline;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 22px;
  font-size: 25px;
  font-weight: bold;
  gap: 10px;
`;

// Styled-component: Header image
const HeaderImage = styled.img`
  width: 40px; // Adjust image width
  height: auto; // Maintain aspect ratio
`;

const App = () => {
  // State to manage the list of transactions
  const [transactions, setTransactions] = useState(() => {
    // Load transactions from localStorage on initialization
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  // Helper function to save transactions to localStorage
  const saveToLocalStorage = (updatedTransactions) => {
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  // Function to add a new transaction (income/expense)
  const addTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction]; // Add new transaction to list
    setTransactions(updatedTransactions); // Update state
    saveToLocalStorage(updatedTransactions); // Save updated list to localStorage
  };

  // Function to calculate total income and expense dynamically
  const calculateBalance = () => {
    return transactions.reduce(
      (totals, transaction) => {
        if (transaction.type === "EXPENSE") {
          totals.expense += transaction.amount; // Accumulate expense
        } else {
          totals.income += transaction.amount; // Accumulate income
        }
        return totals;
      },
      { income: 0, expense: 0 } // Initialize totals
    );
  };

  // useEffect to keep localStorage synchronized with transactions
  useEffect(() => {
    saveToLocalStorage(transactions); // Save whenever transactions change
  }, [transactions]);

  // Destructure income and expense from calculated balances
  const { income, expense } = calculateBalance();

  return (
    <Container>
      {/* Header Section */}
      <Header>
        Personal Finance Tracker
        <HeaderImage
          src="https://cdn3d.iconscout.com/3d/premium/thumb/online-expensive-report-3d-icon-download-in-png-blend-fbx-gltf-file-formats--expenses-tracker-neo-banking-pack-finance-icons-5727732.png"
          alt="Finance Icon"
          style={{ width: "100px", height: "100px" }}
        />
      </Header>
      
      {/* Main Content via HomeComponent */}
      <HomeComponent
        transactions={transactions} // Pass transactions as prop
        expense={expense} // Pass total expense as prop
        income={income} // Pass total income as prop
        addTransaction={addTransaction} // Pass addTransaction function as prop
      />
    </Container>
  );
};

export default App;
