// Import necessary libraries and components
import React, { useEffect, useState } from "react"; // React library and hooks
import styled from "styled-components"; // For styled-components
import OverViewComponent from "./OverViewComponent"; // Overview section component
import TransactionsComponent from "./TransactionsComponent"; // Transactions list component
import ChartComponent from "../../chart/ChartComponent"; // Chart for visualizing data

// Styled-component: Main container for the HomeComponent
const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 400px;
  align-items: center;
  justify-content: flex-start;
`;

// Styled-component: Badge container
const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
`;

// Styled-component: Badge styles for achievements
const Badge = styled.div`
  background: linear-gradient(15deg, ${(props) => props.bgColor}, rgb(151, 151, 147));
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: auto;
  max-width: 180px;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }

  i {
    font-size: 20px;
    transition: transform 0.2s ease;
  }

  &:hover i {
    transform: rotate(25deg);
  }
`;

const HomeComponent = () => {
  // State: List of all transactions
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  // State: Monthly data for charts
  const [monthlyData, setMonthlyData] = useState({});

  // State: Earned badges
  const [badges, setBadges] = useState([]);

  // Function: Recalculate monthly income and expense
  const recalculateMonthlyData = (transactions) => {
    const updatedMonthlyData = {};
    transactions.forEach((payload) => {
      const date = new Date(payload.date);
      const month = `${date.getMonth() + 1}-${date.getFullYear()}`;
      if (!updatedMonthlyData[month]) {
        updatedMonthlyData[month] = { income: 0, expense: 0 };
      }
      if (payload.type === "EXPENSE") {
        updatedMonthlyData[month].expense += payload.amount;
      } else if (payload.type === "INCOME") {
        updatedMonthlyData[month].income += payload.amount;
      }
    });
    setMonthlyData(updatedMonthlyData);
  };

  // Function: Calculate total income and expense
  const calculateBalance = () => {
    let expense = 0;
    let income = 0;
    transactions.forEach((payload) => {
      if (payload.type === "EXPENSE") expense += payload.amount;
      else income += payload.amount;
    });
    return { income, expense };
  };


  // Function: Check and assign badges based on savings ratio
  const checkBadges = (savings, income) => {
    const badgesEarned = [];
    if (income > 0) {
      if (savings / income >= 0.2) {
        badgesEarned.push({ name: "Gold", bgColor: "#FFD700" });
      } else if (savings / income >= 0.15) {
        badgesEarned.push({ name: "Silver", bgColor: "#C0C0C0" });
      } else if (savings / income >= 0.1) {
        badgesEarned.push({ name: "Bronze", bgColor: "#CD7F32" });
      }
    }
    setBadges(badgesEarned);
  };

  // Function: Add a new transaction
  const addTransaction = (payload) => {
    setTransactions((prev) => {
      const updatedTransactions = [...prev, payload];
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      recalculateMonthlyData(updatedTransactions);
      return updatedTransactions;
    });
  };

  // Effect: Recalculate monthly data and badges whenever transactions change
  useEffect(() => {
    recalculateMonthlyData(transactions);
    const { income, expense } = calculateBalance();
    checkBadges(income - expense, income);
  }, [transactions]);

  // Get total income and expense
  const { income, expense } = calculateBalance();

  return (
    <Container>
      {/* Overview Section */}
      <OverViewComponent
        expense={expense} // Pass total expense
        income={income} // Pass total income
        addTransaction={addTransaction} // Pass function to add transactions
      />

      {/* Chart Section */}
      <ChartComponent barMonthlyData={monthlyData} />

      {/* Transactions List */}
      <TransactionsComponent transactions={transactions} />

      {/* Display Earned Badges */}
      <BadgeContainer>
        {badges.map((badge, index) => (
          <Badge key={index} bgColor={badge.bgColor}>
            You Got a {badge.name} Badge <i className="fa-solid fa-medal"></i>
          </Badge>
        ))}
      </BadgeContainer>
    </Container>
  );
};

export default HomeComponent;
