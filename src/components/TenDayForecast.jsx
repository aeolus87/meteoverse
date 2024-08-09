// components/TenDayForecast.js
import React from 'react';

function TenDayForecast({ data }) {
  console.log("TenDayForecast data:", data); // Debug log

  if (!data || !data.list) {
    console.log("TenDayForecast: data.list is undefined");
    return <div>No forecast data available</div>;
  }

  const dailyData = data.list
    .filter(item => new Date(item.dt * 1000).getHours() === 12)
    .slice(0, 6);

  if (dailyData.length === 0) {
    return <div>No daily forecast data available</div>;
  }

  return (
    <div className="bg-gray-700 bg-opacity-50 p-4 rounded-2xl">
      <h3 className="text-sm text-gray-400 mb-2">10-DAY FORECAST</h3>
      {dailyData.map((day, index) => (
        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-600 last:border-b-0">
          <span className="text-sm">{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</span>
          <img 
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
            alt={day.weather[0].description}
            className="w-8 h-8"
          />
          <span className="font-bold">{Math.round(day.main.temp)}°</span>
        </div>
      ))}
    </div>
  );
}

export default TenDayForecast;
