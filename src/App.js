import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { app } from './store/store';
import { Spinner } from '@blueprintjs/core';



import Login from './components/Login';
import Logout from './components/Logout';
import Header from './components/Header';
import Footer from './components/Footer';
<<<<<<< HEAD
import Calendar from './components/Calendar';

=======
import TodoApp from "./components/TodoApp";
>>>>>>> 04890983bf8b6857d32a1b3915a4bf1fc3331501

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
      email: '',
      name: '',
      events: [],
      token: '',
      calendarKey: '',
    }
  }




  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.setState({
          authenticated: true,
          loading: false,
          name: user.email,
          token: user.G,
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
<<<<<<< HEAD
              <Route exact path="/todo" component="" />
              <Route path="/social" component="" />
              <Route path="/calendar" render={() => (
                <Calendar {...this.state} />
              )} />
              <Route path="/weather" component="" />
=======
              <Route exact path="/todo" component={TodoApp} />
              {false && <Route path="/social" component="" />}
              {false && <Route path="/calendar" component="" />}
              {false && <Route path="/weather" component="" />}
>>>>>>> 04890983bf8b6857d32a1b3915a4bf1fc3331501
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
