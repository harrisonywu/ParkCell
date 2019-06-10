import React from 'react';

const Search = (props) => {
  const { saveSearchTerm, searchParks } = props;

  return (
    <form>
      <input onChange={saveSearchTerm} type="text" placeholder="Search park name"></input>
      <input onClick={searchParks} type="button" value="Search!"></input>
      {/* THE BELOW TWO ARE WRONG B/C THEY ARE NOT ASYNC, THEREFORE LOADING IS IFFY */}
      <input onClick={() => {saveSearchTerm(null, 'Park', searchParks); }} type="button" value="Parks Only"></input>
      <input onClick={() => {saveSearchTerm(null, 'Site', searchParks); }} type="button" value="Historic Sites"></input>
    </form>
  )
}

export default Search;
