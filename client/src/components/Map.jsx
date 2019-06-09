import React, { Component } from 'react';
import { TOKEN_GOOGLE_MAPS } from '../config/mapsConfig.js';
import GoogleMapReact from 'google-map-react';
import parkData from '../data/parkData.js'
import styles from './Map.css'

const AnyReactComponent = () => <img src={'/home/harrisonywu/Documents/projects/ridecell-app/client/src/assets/map-marker.png'}></img>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 37.77,
      lng: -122.42
    },

    zoom: 8
  }
  ;

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <div>Map component</div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: TOKEN_GOOGLE_MAPS }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {/* the below lines will loop through a JSON containing our state parks*/}
          {this.props.coordinates.map((park, index) => {
            return <AnyReactComponent lat={park.lat} lng={park.lng} key={index}/>
          })}
          {/* <AnyReactComponent
            lat={37.77}
            lng={-122.42}
            text="My Marker"
          /> */}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;