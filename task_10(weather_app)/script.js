const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherInfo = document.getElementById("weatherInfo");
const message = document.getElementById("message");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        getWeather();
    }
});

async function getWeather(){
    const city = cityInput.value.trim();
    if(city === ""){
        message.textContent = "Please enter a city name!";
        return;
    }
    message.textContent = "Loading...";
    weatherInfo.style.display = "none";

    try{
        const geoURL =`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        const geoResponse = await fetch(geoURL);

        if(!geoResponse.ok){
            throw new Error("Unable to find city");
        }

        const geoData = await geoResponse.json();

        if(!geoData.results || geoData.results.length === 0){
            throw new Error("City not found!");
        }

        const location = geoData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;

        const weatherResponse = await fetch(weatherURL);

        if(!weatherResponse.ok){
            throw new Error("Weather data unavailable");
        }

        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        document.getElementById("cityName").textContent = location.name + ", " + (location.country || "");

        document.getElementById("temperature").textContent = current.temperature_2m + "°C";

        document.getElementById("humidity").textContent = current.relative_humidity_2m + "%";

        document.getElementById("windSpeed").textContent = current.wind_speed_10m + " km/h";

        const weather = getWeatherCondition(
            current.weather_code,
            current.is_day
        );

        document.getElementById("condition").textContent = weather.description;

        document.getElementById("weatherIcon").textContent = weather.icon;

        message.textContent = "";
        weatherInfo.style.display = "block";

    }
    catch(error){
        message.textContent = error.message;
        weatherInfo.style.display = "none";
    }
}

function getWeatherCondition(code, isDay){

    if(code === 0){
        return{
            description: "Clear Sky",
            icon: isDay ? "☀️" : "🌙"
        };
    }

    if(code === 1 || code === 2 || code === 3){
        return { description: "Partly Cloudy", icon: "⛅" };
    }

    if(code === 45 || code === 48){
        return { description: "Foggy", icon: "🌫️" };
    }

    if(code >= 51 && code <= 67){
        return { description: "Drizzle / Rain", icon: "🌧️" };
    }

    if(code >= 71 && code <= 77){
        return { description: "Snowfall", icon: "❄️" };
    }

    if(code >= 80 && code <= 82){
        return { description: "Rain Showers", icon: "🌦️" };
    }

    if(code >= 85 && code <= 86){
        return { description: "Snow Showers", icon: "🌨️" };
    }

    if(code >= 95){
        return { description: "Thunderstorm", icon: "⛈️" };
    }

    return { description: "Unknown Weather", icon: "🌤️" };
}
