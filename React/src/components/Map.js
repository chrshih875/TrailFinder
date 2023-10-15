import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MyMapComponent() {
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (!mapInitialized) {
      const map = L.map('map').setView([51.505, -0.09], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Update the state to indicate that the map has been initialized
      setMapInitialized(true);
    }
  }, [mapInitialized]);

  return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
}

export default MyMapComponent;
