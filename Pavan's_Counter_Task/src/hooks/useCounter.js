import { useState, useCallback } from "react"; 
// Import React hooks `useState` for managing state and `useCallback` for memoizing functions.

export function useCounter() {
  // A custom hook to encapsulate counter logic for reuse across components.

  const [count, setCount] = useState(0); 
  // Declare a state variable `count` initialized to 0. 
  // `setCount` is the function used to update the `count` value.

  const increment = useCallback(() => setCount((prev) => prev + 1), []); 
  // `increment` is a function to increase the count by 1.
  // `useCallback` ensures that the function is memoized and won't be recreated on every render.
  // This optimization is useful for performance in child components that depend on this function.

  const decrement = useCallback(() => setCount((prev) => prev - 1), []); 
  // `decrement` decreases the count by 1.
  // Like `increment`, it's memoized with `useCallback` to avoid unnecessary re-creations.

  const reset = useCallback(() => setCount(0), []); 
  // `reset` resets the count to 0.
  // This is also memoized for performance optimization.

  return { count, increment, decrement, reset }; 
  // Return the `count` value and the three functions (`increment`, `decrement`, `reset`) as an object.
  // This allows the hook consumer to use these in their component.
}
