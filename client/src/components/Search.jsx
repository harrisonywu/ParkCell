import React from 'react';

const Search = (props) => {
  const { saveSearchTerm, searchParks } = props;

  return (
    <form>
      <input onChange={saveSearchTerm} type="text" placeholder="Search park name"></input>
      <input onClick={searchParks} type="button" value="Search!"></input>
      {/* THE BELOW TWO ARE WRONG B/C THEY ARE NOT ASYNC, THEREFORE LOADING IS IFFY */}
      <input onClick={() => {saveSearchTerm(null, 'a', searchParks); }}             type="button" value="Reset Map"></input>
      <input onClick={() => {saveSearchTerm(null, 'Park', searchParks); }}         type="button" value="Show Parks"></input>
      <input onClick={() => {saveSearchTerm(null, 'Site', searchParks); }}         type="button" value="Show Historic Sites"></input>
      <input onClick={() => {saveSearchTerm(null, 'Trailway', searchParks); }}     type="button" value="Show Trailways"></input>
      <input onClick={() => {saveSearchTerm(null, 'Natural Area', searchParks); }} type="button" value="Show Natural Areas"></input>
    </form>
  )
}

export default Search;
