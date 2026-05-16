
const apiKey = "65505787fd071a3a246776cf7bb71e98";

const citySearchForm = document.querySelector('form');
const citySearchInput = document.getElementById('citySearchInput');

function setText(id, value) {
    document.getElementById(id).textContent = value;
}
function changeBackground(weatherType) {

    const body = document.body;

    switch(weatherType.toLowerCase()) {

        case "clear":
            body.style.background =
            "linear-gradient(to right, #56ccf2, #2f80ed)";
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
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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

citySearchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const city = citySearchInput.value;

    fetchWeather(city);

});

fetchWeather();
