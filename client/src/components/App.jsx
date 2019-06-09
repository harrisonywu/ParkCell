import React from 'react';
import GoogleMapReact from './Map.jsx'

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
    <div>
      <GoogleMapReact />
    </div>
    )
  }
}

export default App;
