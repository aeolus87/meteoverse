import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';

function WeatherMap({ lat, lon }) {
  const [scrollZoom, setScrollZoom] = useState(false);
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  function ScrollControl() {
    const map = useMapEvent('zoomstart', () => {
      if (!scrollZoom) {
        map.scrollWheelZoom.disable();
      } else {
        map.scrollWheelZoom.enable();
      }
    });

    return null;
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ height: '256px' }}
      onMouseEnter={() => setScrollZoom(true)}
      onMouseLeave={() => setScrollZoom(false)}
    >
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        scrollWheelZoom={false} // Start with scroll zoom disabled
        style={{ height: '100%', width: '100%' }}
      >
        {/* Control the scroll behavior based on hover */}
        <ScrollControl />

        {/* Base map layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Precipitation layer from OpenWeatherMap */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
        />

        {/* Marker showing the location */}
        <Marker position={[lat, lon]} />
      </MapContainer>
    </div>
  );
}

export default WeatherMap;
