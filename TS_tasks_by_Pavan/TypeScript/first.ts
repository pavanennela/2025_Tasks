// Interface to define the structure of a person object
interface Person {
    name: string;
    age: number;
    city: string;
}

// Sample data of people with their details
const people: Person[] = [
    { name: 'Pavan', age: 25, city: 'Nizamabad' },
    { name: 'SriHari', age: 24, city: 'Nizamabad' },
    { name: 'Vishal', age: 23, city: 'Karimnagar' },
    { name: 'SaiCharan', age: 24, city: 'Karimnagar' },
    { name: 'Shilesh', age: 24, city: 'Jagityal' },
    { name: 'Sampath', age: 22, city: 'Nizamabad' },
    { name: 'Nivas', age: 23, city: 'Nizamabad' },
    { name: 'Nagaraj', age: 25, city: 'Thorrur' },
    { name: 'Sranaya', age: 27, city: 'Kamareddy' },
    { name: 'Bhaskar', age: 25, city: 'Sirikonda' },
    { name: 'Praneeth', age: 23, city: 'Sirikonda' },
    { name: 'Adarsh', age: 23, city: 'Karimnagar' },
    { name: "Sreeja", age: 23, city: "Nizamabad" },
    { name: "Manasa", age: 24, city: "Dharmaram" },
    { name: "Tejaswini", age: 23, city: "Laxmipur" },
    { name: "Ishwarya", age: 22, city: "Kamareddy" }
];

// Function to filter people based on their city
function filterByCity(persons: Person[], query: string): Person[] {
    const lowerQuery = query.toLocaleLowerCase();  // Convert the search query to lowercase for case-insensitive comparison
        // Use ⬇ `filter` method to find people who match the search query by city or name
    return persons.filter(person => 
        person.city.toLowerCase() === lowerQuery || person.name.toLowerCase() === lowerQuery
    ); 
}

// DOM elements
const cityInput = document.getElementById('cityInput') as HTMLInputElement; // Input field for city name
const filterButton = document.getElementById('filterButton') as HTMLButtonElement; // Button to trigger filtering
const results = document.getElementById('results') as HTMLUListElement; // List to display filter results
 

// Event listener for filtering when clicking the button
filterButton.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    
    if (cityName === "") {  // Check if the input is empty and show popup if no city name is provided
        alert("Please enter a city name");
        return; // Stop further execution
    }

    const filteredPeople = filterByCity(people, cityName);  // Get the filtered results

    // Clear previous results
    results.innerHTML = '';

    if (filteredPeople.length > 0) {
        filteredPeople.forEach(person => {
            const listItem = document.createElement('li'); // Create a new list item
            listItem.innerHTML = `
                <strong style="color:rgb(175, 76, 150);">Name:</strong> ${person.name}<br>
                <strong style="color:rgb(82, 171, 198);">Age:</strong> ${person.age}<br>
                <strong style="color:rgb(170, 178, 87);">City:</strong> ${person.city}
            `;
            results.appendChild(listItem); // Add the list item to the results
        });
        console.log('Filtered People:', filteredPeople); //to display the results in the console 
    } else {          
        //If no matching results are found
        const noResultItem = document.createElement('li');
        noResultItem.textContent = 'No matching people found'; // Inform the user
        results.appendChild(noResultItem);
        console.log('No matching people found for:', cityName); // to display the results in the console
    }
});

// Event listener for the "Enter" key press in the input field
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        filterButton.click(); // Trigger the filter button click event
    }
});
