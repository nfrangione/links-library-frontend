import React from 'react';

const Search = (props) => {
  return (
    <div className="filter">
      <input
        onChange = {(e) => props.handleInput(e.target.value)}
        id="search-bar"
        type="text"
        placeholder="Search For Entry Item By Name..."
      />
    </div>
  );
}

export default Search;