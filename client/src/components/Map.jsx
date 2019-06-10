import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { TOKEN_GOOGLE_MAPS } from '../config/mapsConfig';
import parkData from '../data/parkData'
import Search from './Search.jsx'
import styles from '../css/Map.css'

class Map extends Component {
  constructor() {
    super();

    this.state = {
      map: null,
      markers: null,
      currentInfoWindow: null,
      searchTerm: '',
      parkData,
      filteredParkData: parkData,
      center: { lat: 31.9686, lng: -99.9018 },
      zoom: 6,
    };

    this.setMapOnAll = this.setMapOnAll.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.loadMarkers = this.loadMarkers.bind(this);
    this.saveSearchTerm = this.saveSearchTerm.bind(this);
    this.searchParks = this.searchParks.bind(this);
  }

  // Creates a marker for each park in filteredParkData state, each with an info window.
  loadMarkers(map, parkData) {
    let markers = [];
    parkData.forEach((park) => {
      let { lat, lng, title, phone, link, img_url, address, busy_seasons, city } = park;
      lat = parseFloat(lat);
      lng = parseFloat(lng);
      var marker = new google.maps.Marker({
        position: {lat, lng},
        map: map,
        title: title,
      });
      
      let busySeasonString = busy_seasons ? busy_seasons : 'No season information.';

      let contentString = 
      '<div id="content">'+
        '<div id="siteNotice"></div>'+
        `<h1>${title}</h1>`+
        '<div id="bodyContent">'+
          `<img class="location-image" src=${img_url}></img>` +
            `<div>Address: ${address}, ${city}, TX</div>` +
            `<div>Phone Number: ${phone} </div>` +
            `<div>Latitute: ${lat} | Longitude: ${lng}` +
          `<p>Park Website: <a href="${link}">${title}'s Page</a> `+
          `<p>Busy Season: ${busySeasonString}</p>`
        '</div>'+
      '</div>';
  
      let currentInfoWindow = new google.maps.InfoWindow({
        content: contentString
      });

      // Pops up an info window. If one already open, close it first before opening the new one.
      marker.addListener('click', () => {
        if (this.state.currentInfoWindow) {
          this.state.currentInfoWindow.close();
        }
        currentInfoWindow.open(map, marker);
        this.setState({currentInfoWindow})
      });
      markers.push(marker);
    });
    this.setState({markers});
  }

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

  searchParks() {
    const { searchTerm, parkData, map } = this.state;
    let searchTermCapital = searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1);
    let filteredParkData = parkData.filter((park) => {
      return park.title.includes(searchTerm) || park.title.includes(searchTermCapital);
    })    

    this.setState({filteredParkData}, (err) => {
      if (err) throw err;
      this.clearMarkers();
      this.loadMarkers(map, filteredParkData)
    })
   }

  render() {
    const { center, zoom, filteredParkData } = this.state;
    return (
      <div style={{ height: '80vh', width: '100%' }}>
        <h1>ParkCell</h1>
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
