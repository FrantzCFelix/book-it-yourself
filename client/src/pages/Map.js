import React, { Component } from "react";
import Map from "../components/MapComponent";
import Nav from "../components/Nav";


class MapPage extends Component {
  constructor(props){
    super(props);
    this.state ={

    };
  }
  render()
  {
    return (
      <div>
        <Nav />
        <Map></Map>
      </div>
    );
  }
}

export default MapPage;
