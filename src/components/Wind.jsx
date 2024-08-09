import React from 'react';

function Wind({ data, isDarkMode }) {
  const windSpeed = data.wind ? data.wind.speed : 0;
  const windGust = data.wind ? data.wind.gust : 0;
  const windDirection = data.wind ? data.wind.deg : 0;

  // Determine the cardinal direction based on wind direction
  const getCardinalDirection = (degree) => {
    const directions = [
      'N', 'NNE', 'NE', 'ENE',
      'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW',
      'W', 'WNW', 'NW', 'NNW'
    ];
    const index = Math.round(degree / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className={`p-4 rounded-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 relative mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Outer circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke={isDarkMode ? '#cbd5e0' : '#4a5568'} 
              strokeWidth="2" 
            />
            
            {/* Cardinal directions */}
            {['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'].map((dir, index) => {
              const angle = (index * 45) - 90;
              const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
              const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);
              return (
                <text
                  key={dir}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  fill={isDarkMode ? '#e2e8f0' : '#000000'} // Black text in light mode
                  fontSize="6"
                >
                  {dir}
                </text>
              );
            })}
            
            {/* Wind direction arrow */}
            <path 
              d="M50 10 L55 50 L50 90 L45 50 Z" 
              fill={isDarkMode ? 'url(#arrowGradientDark)' : 'url(#arrowGradientLight)'}
              transform={`rotate(${windDirection}, 50, 50)`}
            />
            
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="arrowGradientDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ffeb3b', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
              </linearGradient>
              <linearGradient id="arrowGradientLight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ff0000', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#000000', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            
            {/* Center point */}
            <circle cx="50" cy="50" r="2" fill={isDarkMode ? '#e2e8f0' : '#000000'} />
          </svg>
        </div>
        
        <div className="text-center">
          <p className="text-sm font-medium">{Math.round(windSpeed * 2.237)} MPH</p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Wind</p>
          <p className="text-sm font-medium mt-2">{windGust ? Math.round(windGust * 2.237) : 'N/A'} MPH</p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gusts</p>
        </div>
      </div>
    </div>
  );
}

export default Wind;
