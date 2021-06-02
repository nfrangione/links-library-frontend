import React from 'react';

const SearchNotes = (props) => {
  return (
    <div className="filter">
      <input
        onChange = {(e) => props.handleInput(e.target.value)}
        id="search-bar"
        type="text"
        placeholder="Search For User Note By Entry Item Name..."
        value={props.searchSave}
      />
    </div>
  );
}

export default SearchNotes;