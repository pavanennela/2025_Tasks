function applyBackgroundColor() {
    const colorInput = document.getElementById("colorInput").value; // Get the value of the color input field
    document.getElementById("colorPickerContainer").style.backgroundColor = colorInput; // Apply the selected color to the container
    document.getElementById("selectedColorHexCode").textContent = colorInput; // Update the displayed selected color value
    
}

// Array of predefined colors
const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#33FFF4",
    "#F4FF33",
    "#B533FF",
    "#33FF9E",
    "#FF9933"
];


// // Apply random color from array
function applyRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length); // Get random index
    const randomColor = colors[randomIndex]; // Get color from the array
    document.getElementById("colorPickerContainer").style.backgroundColor = randomColor; // Apply color to the entire page
    document.getElementById("selectedColorHexCode").textContent = randomColor; // Update displayed color
}

