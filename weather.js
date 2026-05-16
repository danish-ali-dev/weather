const url = `https://api.api-ninjas.com/v1/weather?lat=32.733&lon=74.867`;
const options = {
	method: 'GET',
	headers: {
		'X-Api-Key': 'yWESxrmBKRgsneLp7rfF1lPPGWPwJNB1fwyFcjeo',
		'Content-Type': 'application/json'
	}
};
async function getWeather() {

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}
}
getWeather();
// function displayWeeklyForecast(forecastDays) {
//   const container = document.querySelector('.forecast-container');
//   container.innerHTML = ''; // Clear out any placeholder text

//   forecastDays.forEach(dayData => {
//     // 1. Get the short day name (e.g., "Tue")
//     const date = new Date(dayData.date); 
//     const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

//     // 2. Safely round temperatures 
//     const maxTemp = Math.round(dayData.day.maxtemp_c);
//     const minTemp = Math.round(dayData.day.mintemp_c);
    
//     // 3. Extract icon and condition description
//     const iconUrl = dayData.day.condition.icon;
//     const description = dayData.day.condition.text;

//     // 4. Create the card template
//     const cardHTML = `
//       <div class="forecast-card">
//         <p class="forecast-day">${dayName}</p>
//         <img src="${iconUrl}" alt="${description}" class="forecast-icon" />
//         <div class="forecast-temps">
//           <span class="max-temp">${maxTemp}°C</span>
//           <span class="min-temp">${minTemp}°C</span>
//         </div>
//         <p style="font-size: 0.8rem; opacity: 0.8; margin-top: 5px;">${description}</p>
//       </div>
//     `;

//     // 5. Append to the layout
//     container.innerHTML += cardHTML;
//   });
// }