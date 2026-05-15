const apiKey = 'yWESxrmBKRgsneLp7rfF1lPPGWPwJNB1fwyFcjeo';

async function getWeather() {
    // 1. Get the city name from your input field (assuming ID is 'city')
    const cityInput = document.getElementById('city').value || 'Jammu'; 

    try {
        // STEP 1: Fetch Coordinates
        const geoResponse = await fetch(`https://api.api-ninjas.com/v1/geocoding?city=${cityInput}`, {
            headers: { 'X-Api-Key': apiKey }
        });
        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
            console.error("City not found");
            return;
        }

        // STEP 2: Extract lat and lon safely
        const lat = geoData[0].latitude;
        const lon = geoData[0].longitude;

        console.log(`Found coordinates: ${lat}, ${lon}`);

        // STEP 3: Fetch Weather using the new coordinates
        const weatherResponse = await fetch(`https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`, {
            headers: { 'X-Api-Key': apiKey }
        });
        const weatherData = await weatherResponse.json();

        // STEP 4: Update your Table/UI
        console.log("Weather Data:", weatherData);
        updateUI(weatherData);

    } catch (error) {
        console.error("The request failed:", error);
    }
}

function updateUI(data) {
    // This part connects the data to your HTML elements
    // Example: document.getElementById('temp').innerHTML = data.temp;
}