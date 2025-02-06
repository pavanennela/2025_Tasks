import React, { useState } from "react";
import styled from "styled-components"; // Import styled-components for styling React components

// Styled-components for various UI elements

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: center;
  font-size: 16px;
  font-family: Montserrat; // Corrected typo in font-family
  width: 60vw;
`;

const ExpenseContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows wrapping to the next line */
  gap: 12px;
  margin: 20px;
  justify-content: center;

  @media (min-width: 1024px) {
    /* Large screens */
    flex-direction: row;
    justify-content: space-between;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    /* Tablet screens */
    flex-direction: row;
    justify-content: space-evenly;

    & > div:nth-child(3) {
      /* Center the third box */
      // flex: 1 1 50%;
      display: flex;
      justify-content: center;
    }
  }

  @media (max-width: 767px) {
    /* Mobile screens */
    flex-direction: column;
    align-items: center;
    width:90vw;
  }
`;


const ExpenseBox = styled.div`
  border-radius: 8px;
  border: 1px solid #e6e8e9;
  padding: 20px 25px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content:center;
  gap: 10px;
  width: 180px;
  height:90px;
  background-color: ${(props) =>
    props.balance
      ? props.balance && "#c7eded"
      : props.isIncome
      ? "#E6F7E6"
      : "#FFE6E6"}; // Dynamic background color based on transaction type
  color: #000;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  & span {
    font-weight: bold;
    color: ${(props) =>
      props.balance
        ? props.balance && "#307f7e"
        : props.isIncome
        ? "#2E7D32"
        : "#D32F2F"}; // Dynamic text color
    font-size: 22px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); // Adds hover effect for better UI feedback
    background-color: ${(props) =>
      props.balance
        ? props.balance && "#c7eded"
        : props.isIncome
        ? "#E6F7E6"
        : "#FFE6E6"};
  }
`;

const BalanceBox = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  font-weight: bold;
  & span {
    color: #0d1d2c;
    opacity: 80%;
    font-weight: bold;
    font-size: 20px;
  }
`;

const AddTransaction = styled.div`
  font-size: 15px;
  background: #0d1d2c;
  display: flex;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  flex-direction: row;
  border-radius: 4px;
  font-weight: bold;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  &:hover {
    background: linear-gradient(
      45deg,
      #0056b3,
      #092030
    ); // Gradient hover effect
    transform: translateY(-2px);
  }
`;

const AddTransactionContainer = styled.div`
  font-size: 15px;
  display: ${(props) =>
    props.isAddTxnVisible ? "flex" : "none"}; // Toggle visibility dynamically
  color: #0d1d2c;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid #e6e8e9;
  width: 100%;
  align-items: center;
  padding: 15px 20px;
  margin: 10px 20px;
  gap: 10px;
  & input {
    width: 90%;
    outline: none;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid #e6e8e9;
  }
`;

const StyledInput = styled.input`
  width: 90%;
  outline: none;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid #e6e8e9;
  font-size: 16px;
  font-family: Montserrat, sans-serif;
  background-color: #f9f9f9;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    border-color: #0d1d2c;
    background-color: #ffffff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  }

  &::placeholder {
    color: #b0b0b0;
    font-style: italic;
  }
`;

const StyledRadioBox = styled.div`
  & label {
    font-size: 16px;
    color: #0d1d2c;
    margin-right: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  & input[type="radio"] {
    accent-color: #0d1d2c; /* Modern browsers will use this for styling */
    cursor: pointer;
    width: 18px;
    height: 18px;
    margin-right: 5px;
  }

  & input[type="radio"]:checked + label {
    color: #0056b3;
  }
`;

const StyledAddTransaction = styled(AddTransaction)`
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 8px;
  font-family: Montserrat, sans-serif;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background: linear-gradient(45deg, #004494, #0d1d2c);
    transform: translateY(-3px);
  }
`;

// AddTransactionView Component: Handles the form for adding new transactions
const AddTransactionView = (props) => {
  const [amount, setAmount] = useState(); // State to hold the transaction amount
  const [desc, setDesc] = useState(); // State to hold the description
  const [type, setType] = useState("EXPENSE"); // State for transaction type (default: "EXPENSE")
  const [date, setDate] = useState(""); // State for transaction date

  return (
    <AddTransactionContainer isAddTxnVisible={props.isAddTxnVisible}>
      <StyledInput
        placeholder="Enter Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <StyledInput
        placeholder="Enter Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <StyledInput
        placeholder="Enter Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <StyledRadioBox>
        <div>
          <input
            type="radio"
            id="expense"
            name="type"
            value="EXPENSE"
            checked={type === "EXPENSE"}
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="expense">Expense</label>
          <input
            type="radio"
            id="income"
            name="type"
            value="INCOME"
            checked={type === "INCOME"}
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="income">Income</label>

        </div>
      </StyledRadioBox>
      <StyledAddTransaction>
        <AddTransaction
          onClick={() => {
            if (!amount || !desc || !date) {
              alert("Please enter a valid amount, description, and date!"); // Validation
              return;
            }
            if (amount <= 0) {
              alert("Amount must be greater than zero!"); // Validation for positive amount
              return;
            }
            props.addTransaction({
              id: Date.now(), // Unique identifier for the transaction
              amount: Number(amount), // Convert amount to number
              desc,
              type,
              date, // Include the date in the transaction object
            });
            setAmount(""); // Reset amount field
            setDesc(""); // Reset description field
            setType("EXPENSE"); // Reset type to default
            setDate(""); // Reset date field
          }}
        >
          Add Transaction
        </AddTransaction>

      </StyledAddTransaction>
    </AddTransactionContainer>
  );
};

// OverViewComponent: Main component showing balance and transaction overview
const OverViewComponent = (props) => {
  const [isAddTxnVisible, toggleAddTXn] = useState(false); // State to toggle the transaction form visibility

  return (
    <Container>
      <BalanceBox>
        Add Amount Here:- {/* Display calculated balance */}
        <AddTransaction onClick={() => toggleAddTXn((isVisible) => !isVisible)}>
          {isAddTxnVisible ? "CANCEL" : "ADD"} {/* Toggle button text */}
        </AddTransaction>
      </BalanceBox>
      {isAddTxnVisible && (
        <AddTransactionView
          isAddTxnVisible={isAddTxnVisible}
          addTransaction={(payload) => {
            props.addTransaction(payload); // Pass new transaction to parent
            toggleAddTXn((isVisible) => !isVisible); // Close form after adding
          }}
        />
      )}
      <ExpenseContainer>
        <ExpenseBox isIncome={true}>
          Income<span>${props.income}</span> {/* Display total income */}
        </ExpenseBox>
        <ExpenseBox>
          Expense<span>${props.expense}</span> {/* Display total expense */}
        </ExpenseBox>
        <ExpenseBox balance={true}>
          Balance<span>${props.income - props.expense}</span>{" "}
          {/* Display total expense */}
        </ExpenseBox>
      </ExpenseContainer>
    </Container>
  );
};

export default OverViewComponent;
