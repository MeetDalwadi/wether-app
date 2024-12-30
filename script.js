// Replace with your OpenWeatherMap API key
const apiKey = "9b0ffc549e4e6fc8e19c4500ecbe63a9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function getWeather() {
    const cityInput = document.getElementById("city-input");
    const city = cityInput.value;
    
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (response.status === 404) {
            alert("City not found");
            return;
        }

        // Update UI with weather data
        document.getElementById("city").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.getElementById("description").innerHTML = data.weather[0].description;
        
        // Update weather icon
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById("weather-icon").src = iconUrl;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching weather data");
    }
}

// Add event listener for Enter key
document.getElementById("city-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
