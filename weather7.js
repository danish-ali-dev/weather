
const apiKey = "65505787fd071a3a246776cf7bb71e98";

const citySearchForms = document.querySelectorAll('.city-search-form');
const cities = ["Srinagar", "Delhi", "Mumbai", "Chennai", "Kolkata", "Bangalore", "Hyderabad", "Pune", "Ahmedabad", "Jaipur","Jammu", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara"];

function setText(id, value) {
    document.getElementById(id).textContent = value;
}
function changeBackground(weatherType) {

    const body = document.body;

    switch(weatherType.toLowerCase()) {

        case "clear":
            body.style.background =
            "linear-gradient(to right, #56ccf2, rgb(112, 165, 236))";
            body.style.color = "white";
            break;

        case "clouds":
            body.style.background =
            "linear-gradient(to right, #bdc3c7, #2c3e50)";
            body.style.color = "white";
            break;

        case "rain":
            body.style.background =
            "linear-gradient(to right, #4b79a1, #283e51)";
            body.style.color = "white";
            break;

        case "snow":
            body.style.background =
            "linear-gradient(to right, #e6dada, #274046)";
            body.style.color = "black";
            break;

        case "thunderstorm":
            body.style.background =
            "linear-gradient(to right, #232526, #414345)";
            body.style.color = "white";
            break;

        default:
            body.style.background =
            "linear-gradient(to right, #89f7fe, #66a6ff)";
            body.style.color = "black";
    }
}


async function fetchWeather(city = "Srinagar") {

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        
        const iconCode = data.weather[0].icon;

        const iconUrl =`https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById("weatherIcon").src = iconUrl;


        
        console.log(data.weather[0].main);

        changeBackground(data.weather[0].main);



        console.log(data);

        // Header
        setText("cityNameHeader", data.name);

        // Temperature
        setText("mainTemp", data.main.temp);
        setText("feelsLike", data.main.feels_like);

        // Atmosphere
        setText("humidity", data.main.humidity);
        setText("cloudPct", data.clouds.all);
        setText("maxTemp", data.main.temp_max);
        setText("minTemp", data.main.temp_min);

        // Wind
        setText("windSpeed", data.wind.speed);
        setText("windDegrees", data.wind.deg);

    } catch (error) {

        console.error(error);

        alert("Could not fetch weather data");

    }
}

citySearchForms.forEach(form => {
    const citySearchInput = form.querySelector(".city-search-input");
    const suggestionsContainer = form.querySelector(".suggestions");

    citySearchInput.addEventListener("input", () => {
        const inputValue = citySearchInput.value.trim().toLowerCase();
        suggestionsContainer.innerHTML = "";

        if (!inputValue) {
            return;
        }

        const filteredCities = cities.filter(city =>
            city.toLowerCase().includes(inputValue)
        );

        filteredCities.forEach(city => {
            const suggestionItem = document.createElement("div");
            suggestionItem.classList.add("suggestion-item");
            suggestionItem.textContent = city;

            suggestionItem.addEventListener("click", () => {
                citySearchInput.value = city;
                suggestionsContainer.innerHTML = "";
                fetchWeather(city);
                fetchForecast(city);
            });

            suggestionsContainer.appendChild(suggestionItem);
        });
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const city = citySearchInput.value.trim();

        if (!city) {
            return;
        }

        suggestionsContainer.innerHTML = "";
        fetchWeather(city);
        fetchForecast(city);
    });
});

fetchWeather();
fetchForecast();

async function fetchForecast(city = "Srinagar") {
    setText("cityNameHeader", city); // immediately update city name in header for better UX. imp for change forcast accoring to input city

    const url =
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Forecast city not found");
        }

        const data = await response.json();

        const forecastContainer =
        document.querySelector(".forecast-container");

        forecastContainer.innerHTML = "";

        const dailyForecasts =
        data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        );

        dailyForecasts.forEach(day => {

            const date = new Date(day.dt_txt);

            const dayName =
            date.toLocaleDateString("en-US", {
                weekday: "short"
            });

            const icon =
            `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

            const card = `
                <div class="forecast-card">

                    <h3>${dayName}</h3>

                    <img
                      class="forecast-icon"
                      src="${icon}"
                    >

                     <h4>${day.weather[0].main}</h4>

                    <h2>
                      ${Math.round(day.main.temp)}°C
                    </h2>

                    <p>
                      ${Math.round(day.main.temp_min)}°
                      /
                      ${Math.round(day.main.temp_max)}°
                    </p>

                    <p>
                      Humidity:
                      ${day.main.humidity}%
                    </p>

                </div>
            `;

            forecastContainer.innerHTML += card;

        });

    } catch(error){

        console.log(error);

    }
}
