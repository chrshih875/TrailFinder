import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const TrailFinder = () => {
    const [Locations, setLocationsList] = useState([]);
    const [Trails, setTrails] = useState([]);

    const getTrails = async (Locations) => {
        axios.get(`http://localhost:7080/trails?latitude=${Locations.data.origin.latitude}&longitude=${Locations.data.origin.longitude}`)
        .then((response) => setTrails(response.data.json()))
        .catch((err) => {console.log(err)});
    }

    useEffect(() => {
        const getDistance = async (info) => {
            axios.get(`http://localhost:7080/direction?Origin=${info.lat}&Endpoint=${info.long}`)
            .then((response) => setLocationsList(response.data.json()))
            .catch((err) => {console.log(err)});
        }
        getDistance()
    }, [])


}
