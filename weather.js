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