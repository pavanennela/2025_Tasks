// Select the element that displays the counter value
const counterId = document.querySelector('#counterId');
// Select all the buttons with the class 'btn' (Increase, Decrease, Reset)
const btns = document.querySelectorAll('.btn');

// Initialize the count variable to keep track of the counter value
let count = 0;

// Loop through each button and add an event listener for the 'click' event
btns.forEach((btn) => {
    // When a button is clicked, the event handler is triggered
    btn.addEventListener('click', (e) => {
        // Get the class list of the clicked button
        const styles = e.currentTarget.classList;

        // Check if the clicked button has the 'increase' class
        if (styles.contains('increase')) {
            count++; // Increase the count by 1
        } 
        // Check if the clicked button has the 'decrease' class
        else if (styles.contains('decrease')) {
            count--; // Decrease the count by 1
        } 
        // If neither 'increase' nor 'decrease' is clicked, it must be the 'reset' button
        else {
            count = 0; // Reset the count to 0
        }

        // Change the color of the counter text based on the count value
        if (count > 0) {
            counterId.style.color = 'green'; // Set the counter text to green if count is positive
        } else if (count < 0) {
            counterId.style.color = 'red'; // Set the counter text to red if count is negative
        } else if (count === 0) {
            counterId.style.color = 'grey'; // Set the counter text to grey if count is zero
        }

        // Update the text content of the counter display with the new count value
        counterId.textContent = count;
    })
})


// Key Concepts Covered in this JavaScript Code:
// 1. DOM Manipulation: Selecting elements from the DOM using `querySelector` and `querySelectorAll`.
// 2. Event Handling: Using `addEventListener` to handle 'click' events on buttons.
// 3. Conditional Statements: Using `if`, `else if`, and `else` to handle different cases (increase, decrease, reset).
// 4. Modifying Element Styles: Changing the `textContent` and `style` properties to update the UI dynamically.
// 5. Iteration: Using `forEach` to loop through the buttons and apply the event listener to each.
// 6. Managing State: Using a variable (`count`) to maintain and update the state of the counter.
// 7. CSS Class Handling: Using `classList.contains()` to check the classes on the clicked button.