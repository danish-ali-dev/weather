const apiKey = 'yWESxrmBKRgsneLp7rfF1lPPGWPwJNB1fwyFcjeo';
async function getWeather(city) {
    try {
        const geoUrl = `https://api.api-ninjas.com/v1/geocoding?city=${city}`;
        const geoResponse = await fetch(geoUrl, {
            headers: {
                'X-Api-Key': apiKey
            }
        });
        const geoData = await geoResponse.json();
        if (geoData.length === 0) {
            console.error('City not found');
            return;
        }
        const { lat, lon } = geoData[0];
        const weatherUrl = `https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`;
        const weatherResponse = await fetch(weatherUrl, {
            headers: {
                'X-Api-Key': apiKey
            }
        });
        const weatherData = await weatherResponse.json();
        console.log(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
getWeather('Srinagar');