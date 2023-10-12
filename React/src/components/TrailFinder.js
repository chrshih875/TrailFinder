import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchForm } from './SearchForm';
export const TrailFinder = () => {

    const [Trails, setTrails] = useState([]);

    const getTrails = async (Locations) => {
        await axios.get(`http://localhost:7080/trails?latitude=${Locations.lat}&longitude=${Locations.long}`)
        .then((response) => setTrails(response))
        .catch((err) => {console.log(err)});
    }

    const getDistance = async (info) => {
        axios.get(`http://localhost:7080/direction?Origin=${info.lat}&Endpoint=${info.long}`)
        .then((response) =>console.log(response.data))
        .catch((err) => {console.log(err)});
    }

    const handleSearch = (locations) => {
      getDistance(locations);
    };

    return (
      <div>
        <h1>Trail Finder</h1>
        <SearchForm onSearch={handleSearch} />
        {/* Display the Trails and Locations based on API data */}
      </div>
    );
}
