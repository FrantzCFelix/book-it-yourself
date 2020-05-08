import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';
import Jumbotron from "react-bootstrap/Jumbotron";


class Map extends Component {

  constructor(props){
    super(props);

    this.state = {
      center: {
        lat: 35.6762,
        lng: 139.6503,
      },
      zoom: 11,
    };
  }
  // var map;

  // var tokyo = { lat: 35.6762, lng: 139.6503 };
  // var userLocationCoord = tokyo; //set to tokyo to test desired behavior
  // var cityCoords = tokyo;

  // componentDidMount(){
  //   // this.initMap();
  // }
  // handleLocationError(browserHasGeolocation) {
  //   console.error(
  //     browserHasGeolocation
  //       ? "Error: The Geolocation service failed."
  //       : "Error: Your browser doesn't support geolocation."
  //   );
  // }
  componentDidMount (){
    this.getLocation();
  }

  getLocation() {
    // const seattle = { lat: 47.6062, lng: -122.3321 };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(pos);
        this.setState({center: pos});
      }, () => {
        console.log(`true`);
      });
    }
    else {
      console.log( `Browser doesn't support Geolocation`);
    }
  }


  render() {


    return (
      <Jumbotron>
        <div style={{ height: `50vh`, width: `100%` }}>
          <GoogleMapReact
          // Added This line as a temp 'hacky' fix. To avoid this error when hovering over the map.
          // Cannot read property 'x' of undefined error for basic example when moving mouse over map
            // eslint-disable-next-line no-empty-function
            distanceToMouse={() => {}}
            bootstrapURLKeys={{ key: `AIzaSyA7Wxb7HnT4rc08hFfYfwrurjFkRRLSRkA`}}

            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
          </GoogleMapReact>
        </div>
      </Jumbotron>
    );
  }
}


export default Map;
