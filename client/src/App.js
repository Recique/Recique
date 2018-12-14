import React, { Component } from "react";
import "./App.scss";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import AuthService from "./components/auth/AuthService";
import { Route, Link, Switch } from "react-router-dom";
import MapContainer from "./components/Map/MapContainer";
import Header from "./components/Header/Header";

class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null
    };

    this.authService = new AuthService();

    this.fetchUser();
  }

  fetchUser = () => {
    this.authService
      .loggedin()
      .then(user => this.setState({ ...this.state, user }));
  };

  getUser = user => {
    this.setState({ ...this.state, user });
  };

  logout = () => {
    this.authService
      .logout()
      .then(() => this.setState({ ...this.state, user: null }));
  };

  render() {
    return (
      <div className="App">
        <Header user={this.state.user} logout={this.logout} />
        <Switch>
          <Route
            path="/signup"
            render={() => <Signup getUser={this.getUser} />}
          />
          <Route
            path="/login"
            render={() => <Login getUser={this.getUser} />}
          />
        </Switch>
        <MapContainer />
      </div>
    );
  }
}

export default App;
