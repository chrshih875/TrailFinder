import React, { useState } from 'react';

export const SearchForm = ({ onSearch }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

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
};
