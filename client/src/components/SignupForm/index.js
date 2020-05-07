import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import SideFeedComponent from "../SideFeedComponent";
import Nav from "../Nav";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      role: [],
      confirmPassword: "",
      loggedIn: false,
      redirect: null,
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheck = (event, roleName) => {
    if (event.target.checked) {
      this.setState({
        role: [...this.state.role, roleName],
      });
    } else {
      if (this.state.role.includes(roleName)) {
        const newRoles = [...this.state.role];
        newRoles.splice(newRoles.indexOf(roleName), 1);
        this.setState({ role: newRoles });
      }
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("sign-up handleSubmit, username: ");
    console.log(this.state.username);
    console.log(this.state);

    //request to server to add a new username/password
    axios
      .post("/api/user/", {
        username: this.state.username,
        password: this.state.password,
        location: this.state.location,
        telephone: this.state.telephone,
        email: this.state.email,
        role: this.state.role,
      })
      .then(response => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log("successful signup");
          this.setState({
            loggedIn: true,
            redirect: `/login`,
          });
        } else {
          console.log("username already taken");
        }
      })
      .catch(error => {
        console.log("signup error: ");
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
          <Col xl={4}>
            <div className="d-none d-xl-block">
              <SideFeedComponent />
            </div>
          </Col>
          <Col xl={8}>
            <Form>
              <h3>Create Account</h3>
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
              >
                <Form.Label column sm="1">
                  Password
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formPlaintext"
                className="justify-content-center"
              >
                <Form.Label column sm="1">
                  City
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="text"
                    id="location"
                    name="location"
                    value={this.state.location}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formPlaintextTelephone"
                className="justify-content-center"
              >
                <Form.Label column sm="1">
                  Phone
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="text"
                    id="telephone"
                    name="telephone"
                    value={this.state.telephone}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formBasicEmail"
                className="justify-content-center"
              >
                <Form.Label column sm="1">
                  Email
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formBasicEmail"
                className="justify-content-center"
              >
                <Form.Label column sm="1">
                  Role
                </Form.Label>
                <Col sm="2">
                  <Form.Check
                    type="checkbox"
                    value="artist"
                    label="artist"
                    onChange={event => this.handleCheck(event, `artist`)}
                  />
                  <Form.Check
                    type="checkbox"
                    value="promoter"
                    label="promoter"
                    onChange={event => this.handleCheck(event, `promoter`)}
                  />
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

export default Signup;
