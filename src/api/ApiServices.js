const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

const GEO_API_OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY, // Use environment variable
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  },
};

/**
 * Fetches current weather data and forecast for the given coordinates.
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @returns {Promise<[Object, Object]>} - A promise that resolves to an array containing the current weather and forecast data.
 */
export async function fetchWeatherData(lat, lon) {
  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
    ]);

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    if (weatherData.cod !== 200 || forecastData.cod !== '200') {
      throw new Error(`Failed to fetch weather data: ${weatherData.message || forecastData.message}`);
    }

    return [weatherData, forecastData];
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return [null, null]; // Handle error state
  }
}

/**
 * Fetches cities based on the provided input.
 * @param {string} input - The prefix to search for city names.
 * @returns {Promise<Object>} - A promise that resolves to the list of cities.
 */
export async function fetchCities(input) {
  try {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
      GEO_API_OPTIONS
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch cities: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return null; // Handle error state
  }
}
