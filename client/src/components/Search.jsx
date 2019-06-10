import React from 'react';

const Search = (props) => {
  const { saveSearchTerm, searchParks } = props;

  return (
    <form>
      <input onChange={saveSearchTerm} type="text" placeholder="Search park name"></input>
      <input onClick={searchParks} type="button"></input>
    </form>
  )
}

export default Search;
