import React from 'react';

function WeatherDetails({ data, isDarkMode }) {
  // Extract details from the data
  const details = [
    { label: 'Feels Like', value: `${Math.round(data.main.feels_like)}°`, description: 'Humidity is making it feel warmer' },
    { label: 'Precipitation', value: '2.3"', description: 'in last 24h' }, // This might need to be fetched or updated based on your API
    { label: 'Visibility', value: `${data.visibility / 1000} km`, description: '' }, // Assuming visibility is in meters
    { label: 'Humidity', value: `${data.main.humidity}%`, description: 'The dew point is 25° right now' }, // Dew point data is not available here, adjust if needed
  ];

  return (
    <>
      {details.map((detail) => (
        <div
          key={detail.label}
          className={`bg-gray-700 p-4 rounded-lg ${isDarkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-200'}`}
        >
          <h4 className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{detail.label}</h4>
          <p className={`text-2xl font-bold my-1 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{detail.value}</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{detail.description}</p>
        </div>
      ))}
    </>
  );
}

export default WeatherDetails;
