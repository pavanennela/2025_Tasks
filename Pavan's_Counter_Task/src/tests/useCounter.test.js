import { renderHook, act } from "@testing-library/react"; // Importing testing utilities for custom hooks
import { useCounter } from "../hooks/useCounter"; // Importing the useCounter hook for testing

describe("useCounter Hook", () => {
  // Test case 1: Ensures that the useCounter hook initializes with a count of 0
  it("initializes with a count of 0", () => {
    const { result } = renderHook(() => useCounter()); // Rendering the custom hook using renderHook
    // Check that the initial count value is 0
    expect(result.current.count).toBe(0);
  });

  // Test case 2: Simulates incrementing the counter using the hook
  it("increments the count", () => {
    const { result } = renderHook(() => useCounter()); // Rendering the custom hook
    // Using act() to perform the increment action (because hooks can trigger state updates)
    act(() => result.current.increment());
    // Check that the counter has incremented to 1
    expect(result.current.count).toBe(1);
  });

  // Test case 3: Simulates decrementing the counter using the hook
  it("decrements the count", () => {
    const { result } = renderHook(() => useCounter()); // Rendering the custom hook
    // Using act() to perform the decrement action
    act(() => result.current.decrement());
    // Check that the counter has decremented to -1
    expect(result.current.count).toBe(-1);
  });

  // Test case 4: Simulates resetting the counter to 0 after incrementing it
  it("resets the count to 0", () => {
    const { result } = renderHook(() => useCounter()); // Rendering the custom hook
    // Performing both increment and reset actions inside act() for proper state update handling
    act(() => {
      result.current.increment(); // Increment counter to 1
      result.current.reset(); // Reset counter to 0
    });
    // Check that the counter has been reset to 0
    expect(result.current.count).toBe(0);
  });
});
