import styled from "styled-components";
import React, { useEffect, useState } from "react";

// Container for the entire Transactions component
const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 60vw;
  gap: 10px;
  font-weight: bold;
  overflow-y: auto !important;

  & input {
    padding: 10px 12px;
    border-radius: 12px;
    background: #e6e8e9;
    border: 1px solid #e6e8e9;
    outline: none;
  }
`;

// Cell styles for individual transaction items
const Cell = styled.div`
  background-color: ${(props) => (props.isExpense ? "#f9e6e6" : "#e9f7ef")};
  color: #0d1d2c;
  display: flex;
  flex-direction: row;
  padding: 12px 18px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #e6e8e9;
  align-items: center;
  font-weight: normal;
  justify-content: space-between;
  border-right: 4px solid ${(props) => (props.isExpense ? "red" : "green")};
  gap: 20px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isExpense ? "#f1d0d0" : "#d0f5e2")};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  span:nth-child(3) {
    font-weight: bold;
    color: ${(props) => (props.isExpense ? "red" : "green")};
  }
`;

// Dropdown select for sorting options
const SortSelect = styled.select`
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #f3f3f3;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
  }
`;

// Helper function to format date strings into readable format
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// TransactionCell component for rendering individual transactions
const TransactionCell = (props) => {
  return (
    <Cell isExpense={props.payload?.type === "EXPENSE"}>
      <span>{props.payload?.desc}</span>
      <span>{formatDate(props.payload?.date)}</span>
      <span>${props.payload?.amount}</span>
    </Cell>
  );
};

// Main TransactionsComponent
const TransactionsComponent = (props) => {
  const [searchText, updateSearchText] = useState(""); // Tracks search input
  const [filteredTransaction, updateTxn] = useState(props.transactions); // Tracks filtered transactions
  const [sortOption, setSortOption] = useState("DATE"); // Tracks selected sorting option

  // Function to sort transactions by date or amount
  const sortTransactions = (transactions) => {
    const sorted = [...transactions];
    if (sortOption === "AMOUNT") {
      sorted.sort((a, b) => b.amount - a.amount); // Sorts by amount in descending order
    } else {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sorts by date in descending order
    }
    return sorted;
  };

  // Filters and sorts data based on search text
  const filterData = (searchText) => {
    if (!searchText || !searchText.trim().length) {
      updateTxn(sortTransactions(props.transactions)); // Default view (sorted, unfiltered)
      return;
    }
    let txn = [...props.transactions];
    txn = txn.filter((payload) =>
      payload.desc.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    updateTxn(sortTransactions(txn));
  };

  // Re-filter data whenever transactions or sorting option changes
  useEffect(() => {
    filterData(searchText);
  }, [props.transactions, sortOption]);

  return (
    <Container>
      Transactions
      <input
        placeholder="Search Your Transactions Here"
        onChange={(e) => {
          updateSearchText(e.target.value);
          filterData(e.target.value);
        }}
      />
      <SortSelect onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
        <option value="DATE">Sort by Date</option>
        <option value="AMOUNT">Sort by Amount</option>
      </SortSelect>
      {filteredTransaction?.map((payload) => (
        <TransactionCell payload={payload} key={payload.id} />
      ))}
    </Container>
  );
};

export default TransactionsComponent;
