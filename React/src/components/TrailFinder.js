import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchForm } from './SearchForm';
import MyMapComponent from './Map';
export const TrailFinder = () => {
    const [direction, setDirection] = useState([]);
    const [trail, setTraill] = useState([]);

    const getTrails = async (Locations) => {
      console.log("HELLO", Locations)
      try {
        const data = getAvergae(Locations);
        console.log("Data", data);
        const response1 = await axios.get(`http://localhost:7080/trails?latitude=${data.point1}&longitude=${data.point2}`);
        console.log(response1);
      } catch (err) {
        console.log(err);
      }
    };

    const getAvergae = (dataPoints) => {
      const x = (dataPoints.origin.latitude + dataPoints.destination.latitude) / 2;
      const y = (dataPoints.origin.longitude + dataPoints.destination.longitude) / 2;
      const response = {
        point1: x,
        point2: y
      };
      return response;
    };

    const getDistance = async (info) => {
        axios.get(`http://localhost:7080/direction?Origin=${info.lat}&Endpoint=${info.long}`)
        .then((response) =>setDirection(response.data.data))
        .catch((err) => {console.log(err)});
    }

    const handleSearch = (locations) => {
      getDistance(locations);
      console.log(direction)
      getTrails(direction);
    };

    return (
      <div style={{ position: 'relative' }}>
      <MyMapComponent />
      <div className="overlay">
        <div className="overlay-container">
          <h1>Trail Finder</h1>
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>
      {/* Display the Trails and Locations based on API data */}
    </div>
    );
}
