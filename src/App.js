import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';
import Search from './components/Search';
import MainWeather from './components/MainWeather';
import HourlyForecast from './components/HourlyForecast';
import SevenDayForecast from './components/SevenDayForecast';
import WeatherDetails from './components/WeatherDetails';
import Wind from './components/Wind';
import WeatherMap from './components/WeatherMap';
import { fetchWeatherData } from './api/ApiServices';
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const fetchWeatherForLocation = async (lat, lon) => {
    setLoading(true);
    setError(null);

    try {
      const [weather, forecast] = await fetchWeatherData(lat, lon);

      if (weather && forecast) {
        setWeatherData(weather);
        setForecastData(forecast);
      } else {
        throw new Error('Failed to fetch weather and forecast');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    await fetchWeatherForLocation(lat, lon);
  };

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherForLocation(latitude, longitude);
          },
          (error) => {
            setError('Error getting location');
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    };

    getCurrentLocation();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'text-white bg-gray-900' : 'text-gray-900 bg-gray-100'} p-6`}
      style={{
        backgroundImage: `url(${isDarkMode ? '/path-to-dark-background.jpg' : '/path-to-light-background.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={`max-w-4xl mx-auto ${isDarkMode ? 'bg-gray-800 bg-opacity-80' : 'bg-white bg-opacity-80'} rounded-3xl shadow-lg p-6 backdrop-blur-sm`}>
        {/* Navbar */}
        <nav className="flex items-center justify-between mb-8">
          <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>METEOVERSE</div>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-white'} transition-colors duration-200`}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
          </button>
        </nav>

        {/* Main Content */}
        {loading && (
          <motion.div
            className="flex items-center justify-center h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ClipLoader color={isDarkMode ? '#ffffff' : '#000000'} size={50} />
          </motion.div>
        )}

        {error && <div className="text-center text-red-500 mt-4">Error: {error}</div>}

        {weatherData && forecastData && !loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-6">
              <Search onSearchChange={handleOnSearchChange} isDarkMode={isDarkMode} />
              <div className={`border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} rounded-xl p-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <MainWeather data={weatherData} isDarkMode={isDarkMode} />
                  </div>
                  <div className="flex-none ml-4">
                    <Wind data={weatherData} isDarkMode={isDarkMode} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <WeatherDetails data={weatherData} isDarkMode={isDarkMode} />
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <HourlyForecast data={forecastData} isDarkMode={isDarkMode} />
              <SevenDayForecast data={forecastData} isDarkMode={isDarkMode} />
              <div className="grid gap-4">
                <WeatherMap lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className={`text-center mt-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <p>
          Created by <a href="https://github.com/aeolus87" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">aeolus87</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
