import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchForm } from './SearchForm';
export const TrailFinder = ({ onSearch }) => {
    const [Trails, setTrails] = useState([]);

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
    return (
      <div>
        <h1>Trail Finder</h1>
        <SearchForm onSearch={handleSearch} />
        {/* Display the Trails and Locations based on API data */}
      </div>
    );
}
