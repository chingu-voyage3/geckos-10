import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { app } from './store/store';
import { Spinner } from '@blueprintjs/core';



import Login from './components/Login';
import Logout from './components/Logout';
import Header from './components/Header';
import Footer from './components/Footer';
import AddEvent from './components/AddEventForm';
import EventList from './containers/EventList';
import BasicTodoApp from "./containers/BasicTodoApp";

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
      email: '',
      name: '',
      uid: '',
    }
  }



  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        this.setState({
          authenticated: true,
          loading: false,
          name: user.email,
          uid: user.uid
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
              <Route path="/social" component="" />
              <Route exact path="/calendar" render={() => (
                <EventList {...this.state} />
              )} />
              <Route path="/calendar/new" render={() => (
                <AddEvent {...this.state} />
              )} />

              <Route path="/weather" component="" />
              <Route exact path="/todo" component={BasicTodoApp} />
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
