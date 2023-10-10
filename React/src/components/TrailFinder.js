import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const TrailFinder = ({ onSearch }) => {
    const [Trails, setTrails] = useState([]);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const getTrails = async (Locations) => {
        axios.get(`http://localhost:7080/trails?latitude=${Locations.data.origin.latitude}&longitude=${Locations.data.origin.longitude}`)
        .then((response) => setTrails(response.data.json()))
        .catch((err) => {console.log(err)});
    }

    const getDistance = async (info) => {
        axios.get(`http://localhost:7080/direction?Origin=${info.lat}&Endpoint=${info.long}`)
        .then((response) => getTrails(response.data.json()))
        .catch((err) => {console.log(err)});
    }

    const handleSearch = () => {
        onSearch({ lat: latitude, long: longitude });
      };

      return (
        <div>
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      );

}
