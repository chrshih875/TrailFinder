import React, { useEffect } from 'react';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS


function MyMapComponent() {
    useEffect(() => {
      // Create a Leaflet map
    //   if (!L.DomUtil.get('map')) { //to check if the map has been initilaized
    //   const map = L.map('map').setView([51.505, -0.09], 13);

    //   // Create a tile layer for the map
    //   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    //   }).addTo(map);
    // }
    // }, []); // The empty dependency array ensures this code runs once when the component is mounted

    return <div id="map" style={{ width: '100%', height: '500px' }}></div>;
  }

  export default MyMapComponent;
