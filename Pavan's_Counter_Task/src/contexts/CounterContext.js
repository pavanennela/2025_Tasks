import React, { createContext, useContext, useState } from "react"; 
// Import React's `createContext`, `useContext`, and `useState` to manage and share state across components.

const CounterContext = createContext(); 
// Create a context object. This will be used to provide and consume state globally.

export function CounterProvider({ children }) {
  // The `CounterProvider` component wraps around other components, allowing them to access the shared state.

  const [count, setCount] = useState(0); 
  // `count` is the current value of the counter. `setCount` is a function to update it.

  const [history, setHistory] = useState([]); 
  // `history` stores an array of strings, each representing a record of user actions (e.g., increment, decrement).

  const [incrementCount, setIncrementCount] = useState(0); 
  // Tracks how many times the Increment button has been clicked.

  const [decrementCount, setDecrementCount] = useState(0); 
  // Tracks how many times the Decrement button has been clicked.

  const [resetCount, setResetCount] = useState(0); 
  // Tracks how many times the Reset button has been clicked.

  const increment = () => {
    setCount((prev) => prev + 1); 
    // Increment the counter by 1.

    setIncrementCount((prev) => prev + 1); 
    // Increment the count of increment actions by 1.

    setHistory((prev) => [...prev, `Incremented to ${count + 1}`]); 
    // Add a record to the history array indicating the new counter value.
  };

  const decrement = () => {
    setCount((prev) => prev - 1); 
    // Decrement the counter by 1.

    setDecrementCount((prev) => prev + 1); 
    // Increment the count of decrement actions by 1.

    setHistory((prev) => [...prev, `Decremented to ${count - 1}`]); 
    // Add a record to the history array indicating the new counter value.
  };

  const reset = () => {
    setCount(0); 
    // Reset the counter value to 0.

    setResetCount((prev) => prev + 1); 
    // Increment the count of reset actions by 1.

    setHistory((prev) => [...prev, `Reset to 0`]); 
    // Add a record to the history array indicating the reset action.
  };

  return (
    <CounterContext.Provider
      value={{
        count, // The current counter value.
        increment, // Function to increment the counter.
        decrement, // Function to decrement the counter.
        reset, // Function to reset the counter.
        history, // The array of action history.
        incrementCount, // Total number of increment actions.
        decrementCount, // Total number of decrement actions.
        resetCount, // Total number of reset actions.
      }}
    >
      {children} 
      {/* Render any child components wrapped by the `CounterProvider`. */}
    </CounterContext.Provider>
  );
}

export const useCounterContext = () => useContext(CounterContext); 
// Custom hook to consume the CounterContext. It provides access to the shared state and functions.

