import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MyMapComponent({ trails }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  // Initialize the map when the component mounts
  useEffect(() => {
    if (!mapRef.current) {
      // mapRef.current = L.map(mapContainerRef.current).setView([33.83052, -117.76536], 13);
      if (trails.length>0) {
        // If there are trails, set the view based on the first trail's coordinates
        const firstTrail = trails[0];
        mapRef.current = L.map(mapContainerRef.current).setView([firstTrail.lat, firstTrail.lon], 13);
      } else {
        // console.log("trail false");

        // If no trails are available, set the view to show the entire US
        mapRef.current = L.map(mapContainerRef.current).setView([37.0902, -95.7129], 5); // Coordinates for the US
      }

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
  }, [trails]);

  // Add markers based on the 'trails' data
  useEffect(() => {
    console.log("hello");
    if (trails) {

      const customIcon = L.icon({
        iconUrl: require('./trail_icons.jpg'), // Replace this with the path to your custom marker icon
        iconSize: [25, 25], // Adjust the size of the icon
        // iconAnchor: [20, 40], // Adjust the anchor point of the icon
      });

      trails.forEach((trail) => {
        if (trail.lat && trail.lon) {
          L.marker([trail.lat, trail.lon], { icon: customIcon }).addTo(mapRef.current);
        }
      });
    }
  }, [trails]);

  return <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}></div>;
}

export default MyMapComponent;
