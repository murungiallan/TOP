import "../css/app.css";

const apiKey = process.env.WEATHER_API_KEY;
async function fetchWeather(location) {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=6&aqi=yes&alerts=yes`;
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
        localtime: data.location.localtime,
        temperature: data.current.temp_c,
        feelsLike: data.current.feelslike_c,
        humidity: data.current.humidity,
        description: data.current.condition.text,
        icon: `https:${data.current.condition.icon}`,
        windSpeed: data.current.wind_kph, 
        airQuality: data.current.air_quality["us-epa-index"], 
        forecast: data.forecast.forecastday.map(day => ({
            date: day.date,
            maxTemp: day.day.maxtemp_c,
            minTemp: day.day.mintemp_c,
            condition: day.day.condition.text,
            icon: `https:${day.day.condition.icon}`
        }))
    };
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weatherDisplay');
    
    // Current Weather
    let weatherHTML = `
        <div class='weather-forecast'>
            <h2>Weather in ${data.location}</h2>
            <img src="${data.icon}" alt="${data.description}">
            <p><strong>Local Time:</strong> ${data.localtime}</p>
            <p><strong>Temperature:</strong> ${data.temperature}°C</p>
            <p><strong>Feels Like:</strong> ${data.feelsLike}°C</p>
            <p><strong>Humidity:</strong> ${data.humidity}%</p>
            <p><strong>Condition:</strong> ${data.description}</p>
            <p><strong>Wind Speed:</strong> ${data.windSpeed} km/h</p>
            <p><strong>Air Quality Index:</strong> ${data.airQuality} (US EPA)</p>
        </div>            
    `;

    // Forecast for 6 Days
    weatherHTML += `<div class='forecast-div'><h3>6-Day Forecast</h3><div class="forecast-container">`;
    data.forecast.forEach(day => {
        weatherHTML += `
            <div class="forecast-day">
                <p>${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <img src="${day.icon}" alt="${day.condition}">
                <p>${day.condition}</p>
                <p>${day.maxTemp}°C / ${day.minTemp}°C</p>
            </div>
        `;
    });
    weatherHTML += `</div></div>`;

    weatherDiv.innerHTML = weatherHTML;
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