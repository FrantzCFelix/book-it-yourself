import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import FeedComponent from "../components/FeedComponent";
import SideFeedComponent from "../components/SideFeedComponent";
import Nav from "../components/Nav";
import Profile from "../pages/Profile";
import Home from "../pages/Index";
import axios from "axios";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
    };
  }

  componentDidMount = () => {
    this.getUser();
  };

  updateUser = userObject => {
    this.setState(userObject);
  };

  getUser = () => {
    axios.get("/api/user/").then(response => {
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          id: response.data.user._id,
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null,
          id: null,
        });
      }
    });
  };

  render() {
    return (
      <div>
        <Nav />
        <Row>
          <Col sm={4}>
            <SideFeedComponent />
          </Col>
          <Col sm={8} xs={12}>
            <div>
              {this.state.loggedIn && <p>Welcome {this.state.username} !</p>}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Main;