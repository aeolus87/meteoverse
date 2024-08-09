import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import MainWeather from './components/MainWeather';
import HourlyForecast from './components/HourlyForecast';
import TenDayForecast from './components/TenDayForecast';
import WeatherDetails from './components/WeatherDetails';
import UVIndex from './components/UVIndex';
import Wind from './components/Wind';
import { fetchWeatherData } from './api/ApiServices';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const [weather, forecast] = await fetchWeatherData(lat, lon);
    
    if (weather && forecast) {
      setWeatherData(weather);
      setForecastData(forecast);
    } else {
      console.error('Failed to load weather data');
    }
  };

  useEffect(() => {
    // Fetch default weather data for a location, e.g., Hanoi
    handleOnSearchChange({ value: "21.0245 105.8412" });
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6" style={{ backgroundImage: 'url(/path-to-rainy-background.jpg)' }}>
      <div className="max-w-4xl mx-auto">
        <Search onSearchChange={handleOnSearchChange} />
        {weatherData && forecastData ? (
          <div className="bg-gray-800 bg-opacity-80 rounded-3xl shadow-lg p-6 backdrop-blur-sm mt-4">
            <MainWeather data={weatherData} />
            <div className="grid grid-cols-2 gap-4 mt-6">
              <WeatherDetails data={weatherData} />
            </div>
            <div className="mt-6">
              <HourlyForecast data={forecastData} />
            </div>
            <div className="mt-6">
              <TenDayForecast data={forecastData} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <UVIndex data={weatherData} />
              <Wind data={weatherData} />
            </div>
          </div>
        ) : (
          <div>Loading data...</div>
        )}
      </div>
    </div>
  );
}

export default App;
