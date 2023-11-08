import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function MyMapComponent({ trails }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  // Initialize the map when the component mounts
  useEffect(() => {
    if (!mapRef.current) {
      console.log("map false");
      // mapRef.current = L.map(mapContainerRef.current).setView([33.83052, -117.76536], 13);
      if (trails) {
        console.log("trail true");
        // If there are trails, set the view based on the first trail's coordinates
        const firstTrail = trails[0];
        mapRef.current = L.map(mapContainerRef.current).setView([firstTrail.lat, firstTrail.lon], 13);
      } else {
        console.log("trail false");

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
  // useEffect(() => {
  //   // console.log("hello");
  //   console.log("trails", trails);
  //   if (trails) {
  //     trails.forEach((trail) => {
  //       console.log(trail.lat, trail.lon);
  //       if (trail.lat && trail.lon) {
  //         L.marker([trail.lat, trail.lon]).addTo(mapRef.current);
  //       }
  //     });
  //   }
  // }, [trails]);

  return <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}></div>;
}

export default MyMapComponent;
