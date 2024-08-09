import React, { useState, useEffect } from 'react';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function MainWeather({ data, isDarkMode }) {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      if (data && data.timezone) {
        // Convert timezone offset to milliseconds
        const offset = data.timezone * 1000;
        const date = new Date();
        const utc = date.getTime() + date.getTimezoneOffset() * 60000;
        const localTime = new Date(utc + offset).toLocaleTimeString([], { timeStyle: 'short' });
        setLocalTime(localTime);
      }
    };

    updateTime(); // Update time on component mount
    const intervalId = setInterval(updateTime, 1000); // Update time every second

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [data]);

  if (!data || !data.sys || !data.weather || !data.main) {
    return <div>Loading...</div>; // Handle loading or no data state
  }

  const weatherDescription = data.weather[0].description;
  const capitalizedDescription = capitalizeFirstLetter(weatherDescription);

  return (
    <div className="flex flex-col">
      <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2`}>
        {data.name}, {data.sys.country}
        <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-sm ml-2`}>{localTime}</span>
      </div>
      <div className={`text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{Math.round(data.main.temp)}°</div>
      <div className={`text-2xl mt-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{data.weather[0].main}</div>
      <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {capitalizedDescription}. Feels like {Math.round(data.main.feels_like)}°C.
      </p>
    </div>
  );
}

export default MainWeather;
