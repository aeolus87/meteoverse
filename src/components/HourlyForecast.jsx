// components/HourlyForecast.js
import React from 'react';

function HourlyForecast({ data }) {
  if (!data || !data.list) {
    return <div>Loading...</div>; // Handle loading or no data state
  }

  const hourlyData = data.list.slice(0, 6);

  return (
    <div className="bg-gray-700 bg-opacity-50 p-4 rounded-2xl">
      <h3 className="text-sm text-gray-400 mb-2">HOURLY FORECAST</h3>
      <div className="flex justify-between">
        {hourlyData.map((hour, index) => (
          <div key={index} className="text-center">
            <p className="text-sm">{new Date(hour.dt * 1000).getHours()}:00</p>
            <img 
              src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} 
              alt={hour.weather[0].description}
              className="w-8 h-8 mx-auto my-1"
            />
            <p className="font-bold">{Math.round(hour.main.temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
