import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CounterProvider } from "../contexts/CounterContext"; // Importing context provider to wrap the Counter component
import Counter from "../components/Counter"; // Importing the Counter component to be tested

describe("Counter Component", () => {
  // Test case 1: Ensures that the Counter component renders with an initial value of 0
  it("renders the counter with initial value 0", () => {
    render(
      // Wrap Counter component inside the CounterProvider to make the context available
      <CounterProvider>
        <Counter /> 
      </CounterProvider>
    );

    // Check that the text "0" appears in the document, indicating initial state
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  // Test case 2: Simulates the increment functionality of the counter
  it("increments the counter", async () => {
    render(
      // Wrapping Counter component inside the provider again
      <CounterProvider>
        <Counter />
      </CounterProvider>
    );

    // Get the button with the name "increase" (e.g., the increment button)
    const incrementBtn = screen.getByRole("button", { name: /increase/i });
    
    // Simulate a click event on the increment button
    fireEvent.click(incrementBtn);
    
    // Debugging: print the current DOM to the console to see if state updates correctly
    screen.debug();
    
    // Wait for the DOM to update and check if the value of counter is 1
    await waitFor(() => expect(screen.getByText("1")).toBeInTheDocument());
  });

  // Test case 3: Simulates the decrement functionality of the counter
  it("decrements the counter", async () => {
    render(
      // Wrapping Counter component inside the provider again
      <CounterProvider>
        <Counter />
      </CounterProvider>
    );

    // Get the button with the name "decrease" (e.g., the decrement button)
    const decrementBtn = screen.getByRole("button", { name: /decrease/i });
    
    // Simulate a click event on the decrement button
    fireEvent.click(decrementBtn);

    // Debugging: print the current DOM to the console to see if state updates correctly
    screen.debug();
    
    // Wait for the DOM to update and check if the value of counter is -1
    await waitFor(() => expect(screen.getByText("-1")).toBeInTheDocument());
  });

  // Test case 4: Simulates resetting the counter to 0
  it("resets the counter", async () => {
    render(
      // Wrapping Counter component inside the provider again
      <CounterProvider>
        <Counter />
      </CounterProvider>
    );

    // Get the button with the name "reset" (e.g., the reset button)
    const resetBtn = screen.getByRole("button", { name: /reset/i });
    
    // Simulate a click event on the reset button
    fireEvent.click(resetBtn);

    // Debugging: print the current DOM to the console to see if state updates correctly
    screen.debug();
    
    // Wait for the DOM to update and check if the counter value is reset to 0
    await waitFor(() => expect(screen.getByText("0")).toBeInTheDocument());
  });
});
