import React from 'react';

function MainWeather({ data }) {
  console.log("MainWeather data:", data); // Add this line for debugging

  if (!data || !data.sys || !data.weather || !data.main) {
    return <div>Loading...</div>; // Handle loading or no data state
  }

  return (
    <div className="flex flex-col">
      <div className="text-gray-400 text-sm mb-2">{data.name}, {data.sys.country}</div>
      <div className="text-6xl font-bold">{Math.round(data.main.temp)}°</div>
      <div className="text-2xl mt-2">{data.weather[0].main}</div>
      <p className="text-sm mt-2 text-gray-400">
        {data.weather[0].description}. Feels like {Math.round(data.main.feels_like)}°C.
      </p>
    </div>
  );
}

export default MainWeather;
