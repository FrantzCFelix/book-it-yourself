import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';
import Jumbotron from "react-bootstrap/Jumbotron";
import MapTest from "../../assets/images/mapTest.jpg";


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {

  constructor(props){
    super(props);

    this.state = {
      center: {
        lat: -47.6062,
        lng: 122.3321,
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
            bootstrapURLKeys={{ key: `AIzaSyA7Wxb7HnT4rc08hFfYfwrurjFkRRLSRkA`}}

            defaultCenter={this.state.center}
            defaultZoom={this.state.zoom}
          >
            <AnyReactComponent
              lat={47.6062}
              lng={-122.3321}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </Jumbotron>
    );
  }
}


export default Map;
