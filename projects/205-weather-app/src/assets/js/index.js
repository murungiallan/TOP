import "../css/app.css";
import rainImg from "../images/rain.jpeg";
import snowImg from "../images/snow.jpeg";
import thunderImg from "../images/thunder.jpeg";
import dayImg from "../images/day.jpeg";
import nightImg from "../images/night.jpeg";

const apiKey = process.env.WEATHER_API_KEY;
async function fetchWeather(location) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json(); // Get error details if available
            const errorMessage = errorData.error.message || 'Location not found'; // Extract message
            throw new Error(errorMessage); // Throw with a more specific message
        }
        const data = await response.json();
        return processWeatherData(data);
    } catch (error) {
        console.error(error);
        alert(`Error fetching weather data: ${error.message}. Please check the location and your API key.`);
        return null;
    }
}

function processWeatherData(data) {
    return {
        location: data.location.name,
        temperature: data.current.temp_c, // Use Celsius
        feelsLike: data.current.feelslike_c, // Use Celsius
        humidity: data.current.humidity,
        description: data.current.condition.text,
        icon: `https:${data.current.condition.icon}` // WeatherAPI icon URL is already https
    };
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weatherDisplay');
    weatherDiv.innerHTML = `
        <h2>Weather in ${data.location}</h2>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Feels Like: ${data.feelsLike}°C</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Condition: ${data.description}</p>
        <img src="${data.icon}" alt="${data.description}">
    `;

    // Set background image based on weather condition
    const body = document.body;
    let backgroundImage = '';

    const condition = data.description.toLowerCase(); // Use lowercase for easier comparison
    if (condition.includes('rain')) {
        backgroundImage = `url(${rainImg})`; // Replace with your rain image URL
    } else if (condition.includes('snow')) {
        backgroundImage = `url(${snowImg})`; // Replace with your snow image URL
    } else if (condition.includes('clear') || condition.includes('sun')) { // Check for clear or sun
        backgroundImage = `url(${dayImg})`; // Replace with your sun image URL
    } else if (condition.includes('thunder')) {
        backgroundImage = `url(${thunderImg})`; // Replace with your thunder image URL
    } else if (condition.includes('night')) { // Check for night
        backgroundImage = `url(${nightImg})`; // Replace with your night image URL
    }

    body.style.backgroundImage = backgroundImage;


    // Show weather display with animation
    weatherDiv.classList.add('show');
}

document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const location = document.getElementById('locationInput').value;
    const weatherData = await fetchWeather(location);
    if (weatherData) {
        displayWeather(weatherData);
    }
});