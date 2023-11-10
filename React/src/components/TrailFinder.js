import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchForm } from './SearchForm';
import MyMapComponent from './Map';
import LoadingSpinner from './LoadingSpinner';

export const TrailFinder = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [direction, setDirection] = useState(null);
    const [trail, setTrail] = useState([]);

    const getTrails = async (Locations) => {
      try {
        const data = getAvergae(Locations);
        console.log("DATA", data);
        const response = await axios.get(`http://localhost:7080/trails?latitude=${data.point1}&longitude=${data.point2}`);
        setTrail(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getAvergae = (dataPoints) => {
      const x = (dataPoints.origin.latitude + dataPoints.destination.latitude) / 2;
      const y = (dataPoints.origin.longitude + dataPoints.destination.longitude) / 2;
      const response = { point1: x, point2: y };
      return response;
    };

    useEffect(() => {
      if (direction) {
        getTrails(direction);
      }
    }, [direction]);

    const getDistance = async (info) => {
      try {
        const response = await axios.get(`http://localhost:7080/direction?Origin=${info.lat}&Endpoint=${info.long}`);
        if (response.data.data == null){
          console.log("DATA IS NULL")
        } else{
          setDirection(response.data.data);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    const handleSearch = async (locations) => {
      try {
        setIsLoading(true);
        await getDistance(locations); // Wait for getDistance to complete
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div style={{ position: 'relative' }}>
      <MyMapComponent trails={trail} />
      <div className="overlay">
        <div className="overlay-container">
          <h1>Trail Finder</h1>
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>
    </div>
    );
}
