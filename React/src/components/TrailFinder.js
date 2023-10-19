import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchForm } from './SearchForm';
import MyMapComponent from './Map';
export const TrailFinder = () => {
    const [direction, setDirection] = useState([]);
    const [trail, setTraill] = useState([]);
    const [search, setSearch] = useState(false);

    const getTrails = async (Locations) => {
      try {
        console.log("Locations", Locations)
        const data = getAvergae(Locations);
        console.log("DATA", data);
        await axios.get(`http://localhost:7080/trails?latitude=${data.point1}&longitude=${data.point2}`)
        .then((response) => setTraill(response.data.data));
        console.log(trail);
      } catch (err) {
        console.log(err);
      }
    };

    const getAvergae = (dataPoints) => {
      console.log("DTATApoints", dataPoints)
      const x = (dataPoints.origin.latitude + dataPoints.destination.latitude) / 2;
      const y = (dataPoints.origin.longitude + dataPoints.destination.longitude) / 2;
      const response = { point1: x, point2: y };
      return response;
    };

    const getDistance = (info) => {
        axios.get(`http://localhost:7080/direction?Origin=${info.lat}&Endpoint=${info.long}`)
        .then((response) => setDirection(response.data.data))
        .catch((err) => {console.log(err)});
        console.log("direction", direction)
    }

    const handleSearch = async (locations) => {
      setSearch(true)
      const distanceResponse = await getDistance(locations);
      console.log(direction)
      // console.log("distanceresponse", distanceResponse);
      getTrails(direction);
    };

    return (
      <div style={{ position: 'relative' }}>
      {search && <MyMapComponent trails={trail} />}
      <div className="overlay">
        <div className="overlay-container">
          <h1>Trail Finder</h1>
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>
    </div>
    );
}
// 1240 S Walnut St, Anaheim, CA 92802
