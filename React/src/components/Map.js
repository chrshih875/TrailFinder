import React, { useEffect, useRef } from 'react';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

function MyMapComponent({trails}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map only if it's not already initialized
      mapRef.current = L.map(mapContainerRef.current).setView([33.8060874877058, -117.86948974053679], 13);

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

      if (trails) {
        // Loop through the 'trails' data and add markers, polylines, or other map features
        trails.forEach((trail) => {
          L.marker([trail.latitude, trail.longitude]).addTo(mapRef.current);
        });
      }
    }
  }, [trails]);

  return <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh',  overflow: 'hidden' }}></div>;
}

export default MyMapComponent;
