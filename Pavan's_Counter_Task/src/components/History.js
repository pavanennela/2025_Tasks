import React from "react";
import { useCounterContext } from "../contexts/CounterContext";  // Import the custom context for managing counter-related data.
import "./History.css";

function History() {
  const {incrementCount, decrementCount, resetCount } = useCounterContext();
  // Extract the values of `incrementCount`, `decrementCount`, and `resetCount` from the custom Counter context.
  // These values represent the number of times each respective action has been performed.


  return (
    <div className="history-container">
      <h2>History</h2>

      <div className="history-stats">
        <p>Number of Increments: {incrementCount}</p>
        <p>Number of Decrements: {decrementCount}</p>
        <p>Number of Resets: {resetCount}</p>
      </div>
    </div>
  );
}

export default History;
