import React, { Component } from 'react';
import { TOKEN_GOOGLE_MAPS } from '../config/mapsConfig.js';
import GoogleMapReact from 'google-map-react';
import parkData from '../data/parkData.js'
import styles from './Map.css'

// Creates markers for each park in this.state.parkData
const loadMarkers = (map, maps, parkData) => {
  let markers = [];
  
  parkData.forEach((park, index) => {
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
      '<div id="siteNotice">'+
    '</div>'+
    `<h1>${title}</h1>`+
    '<div id="bodyContent">'+
    `<img class="location-image" src=${img_url}></img>` +
    `<div>Phone Number: ${phone} </div>` +
    `<div>Coordinates: Latitute: ${lat}, Longitude: ${lng}` +
    `<p>Park Website: <a href="${link}">`+
    `${link}</a> `+
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
      center: {
        lat: 31.9686,
        lng: -99.9018
      },
      zoom: 6
    };
  }

  /* onChange for Search
    updates a search term in state.
  */

  /* Search Function
   Should modify parkData state
   Calls loadMarkers passing in the now updated state.
   This should result in a new markers/new marker cluster
   DON'T FORGET TO ALLOW FOR ALL THE PARKS TO RERENDER IF YOU PRESS RESET/SEARCH FOR EMPTY TERM
  */




  render() {
    const { center, zoom, parkData } = this.state;
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: TOKEN_GOOGLE_MAPS }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => loadMarkers(map, maps, parkData)}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default Map;
