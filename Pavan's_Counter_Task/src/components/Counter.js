import React, { useEffect } from "react";
import { useCounterContext } from "../contexts/CounterContext"; // Importing the custom context for managing state
import "./Counter.css"; // Importing CSS for styling

function Counter() {
  const { count, increment, decrement, reset } = useCounterContext(); 
  // Access the counter value (`count`) and actions (`increment`, `decrement`, `reset`) from the custom context.

  // Dynamically set CSS class for styling based on the `count` value.
  const countClass = count > 0 ? "positive" : count < 0 ? "negative" : "";

  // Prevent accidental navigation away from the page.
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault(); // For modern browsers, this prevents the default behavior (i.e., page navigation).
      event.returnValue = ""; // For older browsers, this triggers the confirmation dialog.
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    // Attach the `beforeunload` event listener to prompt the user before leaving the page.

    return () => {
      // Cleanup the event listener when the component unmounts to prevent memory leaks.
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []); 
  // The empty dependency array ensures this effect only runs once when the component mounts.

  return (
    <div className="counter-container">
      <h2>Counter</h2> {/* A heading to describe the component */}
      
      <p 
        className={`count-display ${countClass}`} // Dynamically applies the CSS class based on `count`.
        role="status" // ARIA role to indicate this element contains a live status update.
        aria-live="polite" // Screen readers announce changes to this element politely (when users are idle).
      >
        {count} {/* Display the current counter value */}
      </p>

      <div className="counter-buttons">
        {/* Increment button */}
        <button 
          className="inc-counter-btn" 
          onClick={increment} // Increment the counter by 1 on click.
          aria-label="Increase the counter by 1" // Accessible label for screen readers.
        >
          Increment
        </button>

        {/* Decrement button */}
        <button 
          className="dec-counter-btn" 
          onClick={decrement} // Decrement the counter by 1 on click.
          aria-label="Decrease the counter by 1" // Accessible label for screen readers.
        >
          Decrement
        </button>

        {/* Reset button */}
        <button 
          className="counter-btn reset-btn" 
          onClick={reset} // Reset the counter value to 0 on click.
          aria-label="Reset the counter to 0" // Accessible label for screen readers.
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
