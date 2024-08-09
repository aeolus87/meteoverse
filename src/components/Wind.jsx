// components/Wind.js
import React from 'react';

function Wind() {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h4 className="text-sm text-gray-400">Wind</h4>
      <div className="flex justify-between items-center mt-2">
        <div>
          <p className="text-2xl font-bold">3 MPH</p>
          <p className="text-sm text-gray-400">Wind</p>
          <p className="text-xl font-bold mt-2">9 MPH</p>
          <p className="text-sm text-gray-400">Gusts</p>
        </div>
        <div className="w-20 h-20 border-4 border-gray-500 rounded-full relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-white origin-bottom rotate-45"></div>
        </div>
      </div>
    </div>
  );
}

export default Wind;