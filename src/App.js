import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { app } from './store/store';
import { Spinner } from '@blueprintjs/core';

import Login from './components/Login';
import Logout from './components/Logout';
import Header from './components/Header';
import Footer from './components/Footer';
import BasicTodoApp from "./containers/BasicTodoApp";

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
      email: '',
      name: '',
    }
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
          name: user.email,
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        })
      }
    })
  }

  componentWillUnMount() {
    this.removeAuthListener();
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
          <h3>Loading...</h3>
          <Spinner />
        </div>
      )
    }
    return (
      <BrowserRouter>
        <div className="app">
          <Header {...this.state} />
          <div>
            <Switch>
              <Route exact path="/todo" component={BasicTodoApp} />
              {false && <Route path="/social" component="" />}
              {false && <Route path="/calendar" component="" />}
              {false && <Route path="/weather" component="" />}
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
            </Switch>
          </div>
          <Footer {...this.state} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
