import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import React from "react";
import axios from "axios";
import localForage from "localforage";
import API from "./utils/API";
import Login from "./components/LoginForm";
import Main from "./pages/Main";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import FeedComponent from "./components/FeedComponent";
import SignupForm from "./components/SignupForm";
import Search from "./pages/Search";
import MobileSearch from "./pages/MobileSearch";
import UserDetails from "./pages/UserDetails";
import GoogMap from "./pages/Map";
import Calendar from "./pages/Calendar";
import MakePost from "./pages/MakePost";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
      transmitting: false,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    if (navigator.onLine && !this.state.transmitting) {
      this.setState({ transmitting: true });
      this.backOnline();
    }
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

  backOnline = () => {
    localForage
      .length()
      .then(function (numberOfKeys) {
        if (numberOfKeys > 0) {
          localForage
            .iterate(function (value, key, iterationNumber) {
              console.log(`value`);
              console.log(value);
              for (const post of value) {
                API.addPost(post.post).then(postDb => {
                  API.updateUserNewPost(post.user, { id: postDb.data._id })
                    .then(userDb => {
                      console.log(userDb);
                    })
                    .catch(err => console.error(err));
                });
              }
            })
            .then(() => {
              console.log(`iteration complete`);
              localForage
                .clear()
                .then(() => {
                  console.log(`offline storage emptied`);
                  this.setState({ transmitting: false });
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/main" component={Main} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/userdetails" component={UserDetails} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/feed" component={FeedComponent} />
            <Route exact path="/calendar" component={Calendar} />
            <Route
              exact
              path="/post"
              component={MakePost}
              userId={this.state.id}
            />
            <Route exact path="/map" component={GoogMap} />
            <Route exact path="/mobilesearch" component={MobileSearch} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}
export default App;
