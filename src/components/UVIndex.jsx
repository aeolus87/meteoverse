// components/UVIndex.js
import React from 'react';

function UVIndex() {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <h4 className="text-sm text-gray-400">UV Index</h4>
      <p className="text-2xl font-bold my-1">3</p>
      <p className="text-sm">Moderate</p>
      <div className="w-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 h-2 rounded-full mt-2"></div>
      <p className="text-sm mt-2">Use sun protection until 16:00</p>
    </div>
  );
}

export default UVIndex;