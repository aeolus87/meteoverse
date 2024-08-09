import React from 'react';

function SevenDayForecast({ data, isDarkMode }) {
  if (!data || !data.list) {
    return <div>No forecast data available</div>;
  }

  // Filter data for midday forecasts
  const dailyData = data.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000);
    const day = date.getDate();

    if (!acc[day] || Math.abs(date.getHours() - 12) < Math.abs(new Date(acc[day].dt * 1000).getHours() - 12)) {
      acc[day] = item;
    }

    return acc;
  }, {});

  // Get only 7 days of data
  const filteredData = Object.values(dailyData).slice(0, 7);

  if (filteredData.length === 0) {
    return <div>No daily forecast data available</div>;
  }

  return (
    <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-200'}`}>
      <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-700'} mb-2`}>7-DAY FORECAST</h3>
      <div className="flex justify-between">
        {filteredData.map((day, index) => (
          <div key={index} className="text-center">
            <p className="text-sm">{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <img 
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
              alt={day.weather[0].description}
              className="w-8 h-8 mx-auto my-1"
            />
            <p className="font-bold">{Math.round(day.main.temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SevenDayForecast;
