import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MyMapComponent({ trails }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // Initialize the map when the component mounts
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([33.83052, -117.76536], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);

      // Remove the default zoom control
      mapRef.current.removeControl(mapRef.current.zoomControl);

      // Create a custom zoom control
      L.control.zoom({
        position: 'bottomright'
      }).addTo(mapRef.current);
    }
  }, []);

  // Add markers based on the 'trails' data
  useEffect(() => {
    if (trails) {
      trails.forEach((trail) => {
        if (trail.lat && trail.lon) {
          L.marker([trail.lat, trail.lon]).addTo(mapRef.current);
        }
      });
    }
  }, [trails]);

  return <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}></div>;
}

export default MyMapComponent;
