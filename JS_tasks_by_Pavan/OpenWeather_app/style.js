const API_KEY = 'Your API KEY'; // Your OpenWeatherMap API key

// Add event listener to the search button to fetch weather when clicked
document.getElementById('search-button').addEventListener('click', () => {
  const city = document.getElementById('search-input').value; // Get the city name entered by the user
  if (!city) { // Check if the input is empty
    alert('Please enter a city name'); // Show prompt if input is empty
    return; // Stop execution if no city is entered
  }
  fetchWeather(city); // Fetch weather if a city name is provided
});

// Add event listener for the "Enter" key to trigger the search button
document.getElementById('search-input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') { // Check if the key pressed is "Enter"
    document.getElementById('search-button').click(); // Trigger the click event on the search button
  }
});

// Function to fetch weather data for a given city
async function fetchWeather(city) {
  try {
    // Fetch current weather data
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    // Fetch 5-day forecast data
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    // Convert responses to JSON format
    const currentData = await currentResponse.json();
    console.log(currentData); // Log current weather data for debugging
    const forecastData = await forecastResponse.json();

    // Update the user interface with the fetched data
    updateUI(currentData, forecastData);
  } catch (error) {
    console.error('Error fetching weather data:', error); // Log any errors that occur
    alert('Could not fetch weather data to this location. Please try again.'); // Notify the user if data fetching fails
  }
}



// Function to update the user interface with fetched data
function updateUI(currentData, forecastData) {
  const day = new Date().toLocaleString('en-US', { weekday: 'long' }); // Get the current day
  const date = new Date().toLocaleDateString(); // Get the current date

  // Update current weather details
  document.getElementById('day').textContent = day;
  document.getElementById('date').textContent = date;
  document.getElementById('location').textContent = `${currentData.name}, ${currentData.sys.country}`; // City and country
  document.getElementById('temp').textContent = `${currentData.main.temp}°C`; // Temperature
  document.getElementById('weather-condition').textContent = currentData.weather[0].description; // Weather description
  document.getElementById('precipitation').textContent = `${currentData.rain?.['1h'] || 0}%`; // Precipitation (if available)
  document.getElementById('humidity').textContent = `${currentData.main.humidity}%`; // Humidity
  document.getElementById('wind').textContent = `${currentData.wind.speed} km/h`; // Wind speed

  // Map the weather condition to an appropriate icon and update the UI
  const weatherCondition = currentData.weather[0].description.toLowerCase();
  const weatherIcon = getWeatherIcon(weatherCondition);
  const weatherBg = getBackgroundImage(weatherCondition);

  document.getElementById('weather-icon').textContent = weatherIcon;
  // Apply the background image to the body
  document.body.style.backgroundImage = `url('${weatherBg}')`;

  // Update forecast for the next 3 days
  const forecastDays = forecastData.list.filter((_, index) => index % 8 === 0).slice(1, 4); // Select every 8th entry (once a day)
  forecastDays.forEach((forecast, index) => {
    const forecastContainer = document.getElementById(`forecast-temp${index + 1}`);
    forecastContainer.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="weather-icon" />
      ${forecast.main.temp}°C
    `; // Display icon and temperature for the day
  });
}


// Function to map weather descriptions to icons
function getWeatherIcon(condition) {
  if (condition.includes('rain')) return '🌧️'; // If condition includes "rain," use the rain icon
  if (condition.includes('cloud')) return '☁️'; // If condition includes "cloud," use the cloud icon
  if (condition.includes('clear')) return '☀️'; // If condition includes "clear," use the sun icon
  return '🌤️'; // Default icon for other conditions
}

// Function to get background image URL based on weather condition
function getBackgroundImage(condition) {
  if (condition.includes('rain')) {
    return 'https://i.pinimg.com/originals/74/7b/59/747b594e8267d32027079e412387ff1a.jpg'; // Rainy weather background
  }
  if (condition.includes('cloud')) {
    return 'https://t4.ftcdn.net/jpg/05/19/21/73/360_F_519217384_tFwN8gAbpr4BKegQPiDcGpFp1m9MYzdf.jpg'; // Cloudy weather background
  }
  if (condition.includes('clear')) {
    return 'https://images.pexels.com/photos/912364/pexels-photo-912364.jpeg?cs=srgb&dl=pexels-brett-sayles-912364.jpg&fm=jpg'; // Clear weather background
  }
  return 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=1500&h=1000'; // Default background
}
