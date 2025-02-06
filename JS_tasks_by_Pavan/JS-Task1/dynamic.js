// STRING METHODS
let stringInput = document.getElementById("stringInput"); // Get the input element for entering a string
let stringOutput = document.getElementById("stringOutput"); // Get the output paragraph element to display results

// Style the string output for better visibility
stringOutput.style.color = '#b342a0'; // Set text color to purple
stringOutput.style.fontWeight = 'bold'; // Set text to bold

// Reverse a string using split, reverse, and join methods
document.getElementById("reverseStringBtn").onclick = function () {
  let input = stringInput.value; // Get the string from the input field
  stringOutput.textContent = `Reversed: ${input.split("").reverse().join("")}`; // Split string into array, reverse it, and join back into string
};

// Convert string to uppercase
document.getElementById("toUpperCaseBtn").onclick = function () {
  stringOutput.textContent = `Uppercase: ${stringInput.value.toUpperCase()}`; // Convert string to uppercase using `.toUpperCase()`
};

// Convert string to lowercase
document.getElementById("toLowerCaseBtn").onclick = function () {
  stringOutput.textContent = `Lowercase: ${stringInput.value.toLowerCase()}`; // Convert string to lowercase using `.toLowerCase()`
};

// Get the character at index 2 of the string
document.getElementById("charAtBtn").onclick = function () {
  stringOutput.textContent = `Char at 2: ${stringInput.value.charAt(2)}`; // Use `.charAt()` to get the character at index 2
};

// Concatenate a string with " World!"
document.getElementById("concatBtn").onclick = function () {
  stringOutput.textContent = `Concatenated: ${stringInput.value.concat(" World!")}`; // Append " World!" using `.concat()`
};

// Replace all occurrences of "a" with "@"
document.getElementById("replaceBtn").onclick = function () {
  stringOutput.textContent = `Replaced: ${stringInput.value.replace(/a/g, "@")}`; // Use `.replace()` with regex to replace "a" with "@"
};




// FUNCTION METHODS
let functionOutput = document.getElementById("functionOutput"); // Get the output paragraph for function results

// Style the function output for better visibility
functionOutput.style.color = '#b342a0'; // Set text color to purple
functionOutput.style.fontWeight = 'bold'; // Set text to bold

// Calculate factorial using recursion
document.getElementById("factorialBtn").onclick = function () {
  let num = parseInt(document.getElementById("numberInput").value); // Get the input number and convert to integer
  function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1); // Recursive function: If n <= 1, return 1; otherwise return n * factorial(n-1)
  }
  functionOutput.textContent = `Factorial of ${num} is: ${factorial(num)}`; // Display the factorial of the input number
};

// Check if a number is prime
document.getElementById("isPrimeBtn").onclick = function () {
  let num = parseInt(document.getElementById("numberInput").value); // Get the input number and convert to integer
  // Check prime using logical operators and every method
  let isPrime = num > 1 && Array.from({ length: num - 2 }, (_, i) => i + 2).every(n => num % n !== 0); 
  functionOutput.textContent = isPrime ? `${num} is Prime` : `${num} is not Prime`; // Display whether the number is prime
};

// Calculate the sum of digits of a number using a loop
document.getElementById("sumOfDigitsBtn").onclick = function () {
  let num = parseInt(document.getElementById("numberInput").value); // Get the input number and convert to integer
  let sum = 0; // Initialize sum variable
  while (num > 0) { // Loop while num is greater than 0
    sum += num % 10; // Add the last digit of num to sum
    num = Math.floor(num / 10); // Remove the last digit by dividing by 10 and taking the floor
  }
  functionOutput.textContent = `Sum of Digits: ${sum}`; // Display the sum of digits
};





// OBJECT METHODS AND LOOPS
let objectOutput = document.getElementById("objectOutput"); // Get the output paragraph for object results

// Style the object output for better visibility
objectOutput.style.color = '#b342a0'; // Set text color to purple
objectOutput.style.fontWeight = 'bold'; // Set text to bold

// Example object
let person = {
  name: "Pavan", // Name property
  age: 25, // Age property
  occupation: "Developer", // Occupation property
};

// Show object details
document.getElementById("showObjectBtn").onclick = function () {
  objectOutput.textContent = `Name: ${person.name}, Age: ${person.age}, Occupation: ${person.occupation}`; // Access object properties using `.`
};

// Loop through object properties
document.getElementById("loopObjectBtn").onclick = function () {
  let details = ""; // Initialize details string
  for (let key in person) { // Use for-in loop to iterate through object properties
    details += `${key}: ${person[key]} | `; // Access object property using `[]` and concatenate to details
  }
  objectOutput.textContent = details; // Display all properties of the object
};

// Update object properties dynamically
document.getElementById("updateObjectBtn").onclick = function () {
  let nameInput = document.getElementById("nameInput").value; // Get the new name input
  let ageInput = document.getElementById("ageInput").value; // Get the new age input
  let occupationInput = document.getElementById("occupationInput").value; // Get the new occupation input

  if (nameInput.trim() !== "") person.name = nameInput; // Update name if input is not empty
  if (ageInput.trim() !== "" && !isNaN(ageInput)) person.age = parseInt(ageInput); // Update age if valid number
  if (occupationInput.trim() !== "") person.occupation = occupationInput; // Update occupation if input is not empty

  objectOutput.textContent = `Updated: Name: ${person.name}, Age: ${person.age}, Occupation: ${person.occupation}`; // Display updated object
};


// Key Concepts Covered in this JavaScript Code:
// 1. **DOM Manipulation**: The code uses methods like `document.getElementById()` to access elements, set their values, and update content dynamically using properties like `textContent`.
// 2. **String Methods**: Demonstrates the use of various string manipulation methods such as `.split()`, `.reverse()`, `.join()`, `.toUpperCase()`, `.toLowerCase()`, `.charAt()`, `.concat()`, and `.replace()`.
// 3. **Functions**: Includes examples of both named and anonymous functions to perform tasks such as calculating a factorial, checking prime numbers, and summing digits. These functions show the use of recursion, loops, and logical operations.
// 4. **Object Manipulation**: Demonstrates how to define an object, access its properties using dot notation (`.`) and bracket notation (`[]`), update properties dynamically, and iterate over properties using a `for-in` loop.
// 5. **Event Handling**: Attaches `onclick` event listeners to buttons to execute specific functions when buttons are clicked.
// 6. **Validation**: Validates user input by checking if values are not empty (`trim()`) and ensuring valid data types (e.g., checking for a number with `isNaN()`).
// 7. **Loops**: Utilizes `for-in` for iterating through object properties and `while` for summing digits of a number.
// 8. **Dynamic Styling**: Updates styles of output elements dynamically for better visibility using properties like `style.color` and `style.fontWeight`.