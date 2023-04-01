import React, { useState, useRef } from 'react';

const DropdownSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchRef] = useRef(null);
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleFilterChange = (event) => {
    const { value } = event.target;
    if (value) {
      setFilteredItems(filteredItems.filter((item) => item[value]));
    }
  };
  

  return (
    <div>
      <input
        value={searchText}
        onBlur={handleSearchChange}
        onChange={handleSearchChange}
        ref={searchRef}
      />
      <select
        value={searchText}
        onChange={handleFilterChange}
        ref={searchRef}
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.value}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownSearch;