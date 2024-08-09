
// components/WeatherDetails.js
import React from 'react';

function WeatherDetails() {
  const details = [
    { label: 'Feels Like', value: '30°', description: 'Humidity is making it feel warmer' },
    { label: 'Precipitation', value: '2.3"', description: 'in last 24h' },
    { label: 'Visibility', value: '6 mi', description: '' },
    { label: 'Humidity', value: '82%', description: 'The dew point is 25° right now' },
  ];

  return (
    <>
      {details.map((detail) => (
        <div key={detail.label} className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-sm text-gray-400">{detail.label}</h4>
          <p className="text-2xl font-bold my-1">{detail.value}</p>
          <p className="text-sm text-gray-400">{detail.description}</p>
        </div>
      ))}
    </>
  );
}

export default WeatherDetails;