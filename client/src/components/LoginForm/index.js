import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Redirect, Switch } from "react-router-dom";
import axios from "axios";
import Main from "../../pages/Main";
import "./style.css";
import Nav from "../Nav";
import SideFeedComponent from "../SideFeedComponent";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false,
      redirect: null,
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("/api/user/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          console.log(`user data incoming...`);
          console.log(response.data);
          this.setState({
            loggedIn: true,
            redirect: `/feed`,
          });
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <Nav />
        <Row>
          <Col sm={4}>
            <SideFeedComponent />
          </Col>
          <Col sm={8} xs={12}>
            <Form>
              <h3>Login</h3>
              <Form.Group
                as={Row}
                controlId="formPlaintextUsername"
                className="justify-content-center"
              >
                <Form.Label column sm="1">
                  Username
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                controlId="formPlaintextPassword"
                className="justify-content-center"
                value={this.state.password}
                onChange={this.handleChange}
              >
                <Form.Label column sm="1">
                  Password
                </Form.Label>
                <Col sm="2">
                  <Form.Control type="password" name="password" />
                </Col>
              </Form.Group>
              <Button variant="dark" type="submit" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LoginForm;