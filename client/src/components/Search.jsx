import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/Search.css'

const Search = (props) => {
  const { saveSearchTerm, searchParks } = props;

  return (
    <form onSubmit={searchParks}>
      <input className="input-form" onChange={saveSearchTerm}  type="text" placeholder="Search park name"></input>
      <input onClick={searchParks} type="button" value="Search!"></input>
      <input onClick={() => {saveSearchTerm(null, '', searchParks);}}             type="button" value="Reset Map"></input>
      <input onClick={() => {saveSearchTerm(null, 'Park', searchParks);}}         type="button" value="Show Parks"></input>
      <input onClick={() => {saveSearchTerm(null, 'Site', searchParks);}}         type="button" value="Show Historic Sites"></input>
      <input onClick={() => {saveSearchTerm(null, 'Trailway', searchParks);}}     type="button" value="Show Trailways"></input>
      <input onClick={() => {saveSearchTerm(null, 'Natural Area', searchParks);}} type="button" value="Show Natural Areas"></input>
    </form>
  )
}

Search.propTypes = {
  saveSearchTerm: PropTypes.func.isRequired,
  searchParks: PropTypes.func.isRequired,
}

export default Search;
