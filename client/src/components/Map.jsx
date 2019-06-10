import React, { Component } from 'react';
import { TOKEN_GOOGLE_MAPS } from '../config/mapsConfig.js';
import GoogleMapReact from 'google-map-react';
import parkData from '../data/parkData.js'
import Search from './Search.jsx'

import styles from './Map.css'

// Creates markers for each park in this.state.filteredParkData
const loadMarkers = (map, maps, parkData) => {
  let markers = [];
  
  parkData.forEach((park) => {
    let { lat, lng, title, phone, link, img_url} = park;
    lat = parseFloat(lat);
    lng = parseFloat(lng)
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      title: title,
    });

    let contentString = 
    '<div id="content">'+
      '<div id="siteNotice"></div>'+
      `<h1>${title}</h1>`+
      '<div id="bodyContent">'+
        `<img class="location-image" src=${img_url}></img>` +
        // '<div class="park-info>' +
          `<div>Phone Number: ${phone} </div>` +
          `<div>Coordinates: Latitute: ${lat}, Longitude: ${lng}` +
        // '</div>' +
        `<p>Park Website: <a href="${link}">${title}'s Page</a> `+
      '</div>'+
    '</div>';

    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', () => {
      infowindow.open(map, marker);
    })
    markers.push(marker);
  })

  // creates marker clusters for all parks on the map
  let markerCluster = new MarkerClusterer(map, markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
};
class Map extends Component {
  constructor() {
    super();

    this.state = {
      parkData,
      filteredParkData: parkData,
      center: {
        lat: 31.9686,
        lng: -99.9018
      },
      searchTerm: null,
      zoom: 6
    };

    this.saveSearchTerm = this.saveSearchTerm.bind(this);
    this.searchParks = this.searchParks.bind(this);
  }

  saveSearchTerm(e) {
    this.setState({ searchTerm: e.target.value})
  }

  searchParks(e) {
    e.preventDefault();
    const { searchTerm, parkData } = this.state;
    let filteredParkData = parkData.filter((park, index) => {
      return park.title.includes(searchTerm);
    })    

    // FIGURE THIS OUT
    this.setState({filteredParkData}, (err, success) => {
      if (err) throw err;
      loadMarkers(map, null, filteredParkData)
    })
    //this needs to call loadMarkers
    //this may also need to turn off all previosu markers

  }
  /* Search Function
   Should modify parkData state
   Calls loadMarkers passing in the now updated state.
   This should result in a new markers/new marker cluster
   DON'T FORGET TO ALLOW FOR ALL THE PARKS TO RERENDER IF YOU PRESS RESET/SEARCH FOR EMPTY TERM
  */




  render() {
    const { center, zoom, filteredParkData } = this.state;
    return (
      <div style={{ height: '80vh', width: '100%' }}>
        <h1>StateParkCell</h1>
        <Search saveSearchTerm={this.saveSearchTerm} searchParks={this.searchParks}/>
        <GoogleMapReact
          bootstrapURLKeys={{ key: TOKEN_GOOGLE_MAPS }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => loadMarkers(map, maps, filteredParkData)}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default Map;
