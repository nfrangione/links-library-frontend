import React from 'react';

const Search = ({handleInput, search}) => {
  return (
    <div className="filter">
      <input
        onChange = {(e) => handleInput(e.target.value)}
        id="search-bar"
        type="text"
        placeholder="Search For Entry Item By Name..."
        value={search}
      />
    </div>
  );
}

export default Search;