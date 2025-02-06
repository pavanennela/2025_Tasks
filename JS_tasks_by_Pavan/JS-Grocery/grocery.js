// Get references to the DOM elements
const form = document.getElementById('grocery-form'); // The form element to submit new grocery items
const input = document.getElementById('grocery-input'); // The input field where users enter grocery items
const groceryContainer = document.getElementById('grocery-container'); // The container for the grocery list
const groceryList = document.getElementById('grocery-list'); // The actual list where grocery items will appear
const clearBtn = document.getElementById('clear-btn'); // Button to clear all items

// Retrieve stored grocery items from localStorage or set it to an empty array if not found
let items = JSON.parse(localStorage.getItem('groceryItems')) || [];

// Function to render the items in the grocery list
const renderItems = () => {
  // Update the HTML of groceryList by iterating over the items array and creating HTML for each item
  groceryList.innerHTML = items
    .map(
      (item, index) => `
    <li>
      <span>${item}</span> <!-- Display the grocery item -->
      <button class="edit-btn" data-index="${index}">Edit</button> <!-- Edit button with item index as data -->
      <button class="delete-btn" data-index="${index}">Delete</button> <!-- Delete button with item index as data -->
    </li>`
    )
    .join(''); // Join the array into a single string of HTML
  // If there are no items, hide the grocery container (used for UI control)
  groceryContainer.classList.toggle('hidden', items.length === 0);
};

// Function to add a new item when the form is submitted
const addItem = (e) => {
  e.preventDefault(); // Prevent the form from refreshing the page on submit
  const value = input.value.trim(); // Get the input value and remove leading/trailing whitespace
  if (!value) return; // If the input is empty, do nothing
  items.push(value); // Add the new item to the items array
  input.value = ''; // Clear the input field after adding the item
  localStorage.setItem('groceryItems', JSON.stringify(items)); // Save the updated items list to localStorage
  renderItems(); // Re-render the list after adding the new item
};

// Function to handle clicks on the grocery list (edit or delete items)
const handleListClick = (e) => {
  const index = e.target.dataset.index; // Get the index of the clicked item from the data-index attribute
  if (e.target.classList.contains('edit-btn')) { // If the clicked button is the edit button
    const newValue = prompt('Edit Item:', items[index]); // Prompt the user to edit the item
    if (newValue !== null) items[index] = newValue.trim() || items[index]; // Update the item if user provided a new value
  } else if (e.target.classList.contains('delete-btn')) { // If the clicked button is the delete button
    items.splice(index, 1); // Remove the item from the array at the specified index
  }
  localStorage.setItem('groceryItems', JSON.stringify(items)); // Save the updated items list to localStorage
  renderItems(); // Re-render the list after editing or deleting the item
};

// Function to clear all items from the list
const clearItems = () => {
  items = []; // Reset the items array to an empty array
  localStorage.removeItem('groceryItems'); // Remove the grocery items from localStorage
  renderItems(); // Re-render the list to reflect the empty state
};

// Add event listeners to handle form submission and button clicks
form.addEventListener('submit', addItem); // Listen for form submit to add a new item
groceryList.addEventListener('click', handleListClick); // Listen for clicks on edit or delete buttons
clearBtn.addEventListener('click', clearItems); // Listen for click on the clear all button

// Initial render to display any items that are already stored in localStorage
renderItems();


// Key Concepts Demonstrated in this Code

// 1. DOM Manipulation
// - Accessing and manipulating DOM elements using methods like `getElementById`.
// - Dynamically updating the DOM to reflect changes in the application state.

// 2. Event Handling
// - Adding event listeners to respond to user actions such as form submission, button clicks, and more.
// - Using event objects to handle specific actions dynamically (e.g., identifying clicked elements).

// 3. LocalStorage Usage
// - Persisting data using `localStorage` to store the grocery list and retrieving it across sessions.
// - Serializing (`JSON.stringify`) and deserializing (`JSON.parse`) data for storage.

// 4. Rendering Dynamic Content
// - Generating and injecting HTML dynamically based on the state of the `items` array.
// - Using `.map()` to create a list of items and `.join('')` to form a single HTML string.

// 5. Form Handling
// - Preventing default form behavior (page refresh) using `e.preventDefault()`.
// - Validating form inputs to ensure meaningful data is processed.

// 6. Array Manipulation
// - Adding new items to the array with `push`.
// - Removing items using `splice` and updating items by directly modifying array indices.

// 7. Conditional Rendering
// - Dynamically showing or hiding elements based on application state.
// - Example: Toggling the visibility of the grocery container based on whether the list is empty.

// 8. Prompt and Inline Editing
// - Using the `prompt` function to allow users to edit items directly.
// - Inline editing updates the `items` array and re-renders the list.

// 9. Data Validation
// - Ensuring no empty or invalid inputs are processed by the application.
// - Trimming whitespace from input values and skipping actions if input is empty.

// 10. Clear Functionality
// - Clearing all items from the list by resetting the `items` array.
// - Removing persisted data from `localStorage` and updating the UI to reflect the empty state.
