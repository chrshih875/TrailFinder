import React, { useEffect, useRef } from 'react';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

function MyMapComponent() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map only if it's not already initialized
      mapRef.current = L.map(mapContainerRef.current).setView([51.505, -0.09], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);
    }
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh',  overflow: 'hidden' }}></div>;
}

export default MyMapComponent;
