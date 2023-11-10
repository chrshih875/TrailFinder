import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchForm } from './SearchForm';
import MyMapComponent from './Map';
import LoadingSpinner from './LoadingSpinner';

export const TrailFinder = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [direction, setDirection] = useState([]);
    const [trail, setTrail] = useState([]);
    // const [search, setSearch] = useState(false);
    // const [locations, setLocations] = useState(null);

    const getTrails = async (Locations) => {
      try {
        // console.log("Locations", Locations)
        const data = getAvergae(Locations);
        console.log("DATA", data);
        const response = await axios.get(`http://localhost:7080/trails?latitude=${data.point1}&longitude=${data.point2}`);
        setTrail(response.data.data);
        // console.log(trail);
      } catch (err) {
        console.log(err);
      }
    };

    const getAvergae = (dataPoints) => {
      // console.log("DTATApoints", dataPoints)
      const x = (dataPoints.origin.latitude + dataPoints.destination.latitude) / 2;
      const y = (dataPoints.origin.longitude + dataPoints.destination.longitude) / 2;
      const response = { point1: x, point2: y };
      return response;
    };

    useEffect(() => {
      // direction.length > 0 &&
      console.log("DIRECTION", direction)
      if (direction.length > 0) {
        getTrails(direction);
      }
    }, [direction]);

    const getDistance = async (info) => {
      try {
        // console.log("DOES THIS WPORK");
        console.log("HELLO", info)
        // 'http://localhost:7080/direction?Origin=Church St %26 29th St, San-Francisco, CA, USA&Endpoint=145 5th Ave, New York, NY, USA'
        console.log(info.lat);
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
    // https://driving-directions1.p.rapidapi.com/get-directions?origin=Church%25St%29th%25St%25%25San-Francisco%25%CA%25%25USA&destination=145%255th%25Ave%25%25New%25York%25%25NY%25%25USA&avoid_routes=tolls%2Cferries&country=us&language=en
    // https://driving-directions1.p.rapidapi.com/get-directions?origin=Church%25St%25&destination=145%255th%25Ave%25%25New%25York%25%25NY%25%25USA&avoid_routes=tolls%2Cferries&country=us&language=en
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
      {/* {search && <MyMapComponent trails={trail} />} */}
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
// 1240 S Walnut St, Anaheim, CA 92802
