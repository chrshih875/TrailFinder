import React, { useState } from 'react';

export const SearchForm = ({ onSearch }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSearch = () => {
    onSearch({ lat: origin, long: destination });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <p></p>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};
