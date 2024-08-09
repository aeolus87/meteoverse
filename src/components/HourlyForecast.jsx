import React from 'react';

function HourlyForecast({ data, isDarkMode }) {
  if (!data || !data.list) {
    return <div>Loading...</div>;
  }

  const hourlyData = data.list.slice(0, 5);
  const now = new Date();
  const currentHour = now.getHours();

  const getLocalHour = (timestamp, timezoneOffset) => {
    const utc = new Date(timestamp * 1000);
    const local = new Date(utc.getTime() + timezoneOffset * 1000);
    return local.getHours();
  };

  const formatHour = (hour) => {
    const ampm = hour >= 12 ? 'pm' : 'am';
    const hour12 = hour % 12 || 12;
    return `${hour12}:00 ${ampm}`;
  };

  const timezoneOffset = data.timezone ? data.timezone / 3600 : 0;

  return (
    <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-200'}`}>
      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} mb-2`}>3-HOURLY FORECAST</h3>
      <div className="flex justify-between">
        {hourlyData.map((hour, index) => {
          const localHour = getLocalHour(hour.dt, timezoneOffset);
          const isCurrentHour = localHour === currentHour;

          return (
            <div
              key={index}
              className={`text-center ${isCurrentHour ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : ''} rounded-xl p-2`}
            >
              {isCurrentHour && <p className="text-xs bg-blue-700 text-white rounded-full px-2 py-1 mb-1">Now</p>}
              <p className={`text-sm ${isCurrentHour ? 'font-bold' : ''}`}>
                {isNaN(localHour) ? 'N/A' : formatHour(localHour)}
              </p>
              <img 
                src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} 
                alt={hour.weather[0].description}
                className="w-8 h-8 mx-auto my-1"
              />
              <p className={`font-bold ${isCurrentHour ? (isDarkMode ? 'text-white' : 'text-gray-100') : (isDarkMode ? 'text-gray-200' : 'text-gray-800')}`}>{Math.round(hour.main.temp)}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HourlyForecast;
