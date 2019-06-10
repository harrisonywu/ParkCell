import React, { Component } from 'react';
import { TOKEN_GOOGLE_MAPS } from '../config/mapsConfig.js';
import GoogleMapReact from 'google-map-react';
import parkData from '../data/parkData.js'
import Search from './Search.jsx'
import styles from './Map.css'

// Creates markers for each park in this.state.filteredParkData
class Map extends Component {
  constructor() {
    super();

    this.state = {
      map: null,
      markers: null,
      parkData,
      filteredParkData: parkData,
      center: { lat: 31.9686, lng: -99.9018 },
      searchTerm: null,
      zoom: 6,
    };

    this.setMapOnAll = this.setMapOnAll.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.loadMarkers = this.loadMarkers.bind(this);
    this.saveSearchTerm = this.saveSearchTerm.bind(this);
    this.searchParks = this.searchParks.bind(this);
  }


  loadMarkers(map, parkData) {
    let markers = [];
    parkData.forEach((park) => {
      let { lat, lng, title, phone, link, img_url } = park;
      lat = parseFloat(lat);
      lng = parseFloat(lng);
      var marker = new google.maps.Marker({
        position: {lat, lng},
        map: map,
        title: title,
      });
  
      let contentString = 
      '<div id="content">'+
        '<div id="siteNotice"></div>'+
        `<h1>${title}</h1>`+
        '<div id="bodyContent">'+
          `<img class="location-image" src=${img_url}></img>` +
            `<div>Phone Number: ${phone} </div>` +
            `<div>Coordinates: Latitute: ${lat}, Longitude: ${lng}` +
          `<p>Park Website: <a href="${link}">${title}'s Page</a> `+
        '</div>'+
      '</div>';
  
      let infowindow = new google.maps.InfoWindow({
        content: contentString
      });
  
      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });

      markers.push(marker);
    })
  
    // creates marker clusters for all parks on the map
    // let markerCluster = new MarkerClusterer(map, markers,
    //   {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    // this.setState({markers, markerCluster});
    this.setState({markers});
  };

  setMapOnAll(map) {
    const { markers } = this.state;
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  saveSearchTerm(e, keyword, callback) {
    if (!keyword) {
      this.setState({ searchTerm: e.target.value}, () => {
        if (callback) callback();
      });
    } else {
      this.setState({ searchTerm: keyword}, () => {
        if (callback) callback();
      });
    }
  }

  /* Search Function
   Should modify parkData state
   Calls loadMarkers passing in the now updated state.
   This should result in a new markers/new marker cluster
   DON'T FORGET TO ALLOW FOR ALL THE PARKS TO RERENDER IF YOU PRESS RESET/SEARCH FOR EMPTY TERM
  */
  searchParks() {
    const { searchTerm, parkData, map } = this.state;
    let filteredParkData = parkData.filter((park, index) => {
      return park.title.includes(searchTerm);
    })    

    this.setState({filteredParkData}, (err, success) => {
      if (err) throw err;
      this.clearMarkers();
      this.loadMarkers(map, filteredParkData)
    })
   }

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
          onGoogleApiLoaded={({ map }) => {
            this.setState({map}, () => (this.loadMarkers(map, filteredParkData)));
          }} 
        ></GoogleMapReact>
      </div>
    );
  }
}

export default Map;
