import React, { Component } from 'react';
import { TOKEN_GOOGLE_MAPS } from '../config/mapsConfig.js';
import GoogleMapReact from 'google-map-react';
import parkData from '../data/parkData.js'
import styles from './Map.css'


// Creates markers for each 
const apiIsLoaded = (map, maps, parkData) => {
  let markers = [];
  
  parkData.forEach((park, index) => {
    let { lat, lng, title, phone} = park;
    lat = parseFloat(lat);
    lng = parseFloat(lng)
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      title: title,
    });
    marker.addListener('click', function() {
      alert(`Title: ${title} \nPhone: ${phone}`)
    })
    markers.push(marker);
  })

  let markerCluster = new MarkerClusterer(map, markers,
    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
};
class Map extends Component {
  constructor() {
    super();

    this.state = {
      parkData
    };
  }
  static defaultProps = {
    center: {
      lat: 31.9686,
      lng: -99.9018
    },
    zoom: 6

  };

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: TOKEN_GOOGLE_MAPS }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, this.state.parkData)}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default Map;