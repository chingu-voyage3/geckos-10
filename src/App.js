import React, { Component } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <div>
            <Switch>
              <Route exact path="/todo" component="" />
              <Route path="/social" component="" />
              <Route path="/calendar" component="" />
              <Route path="/weather" component="" />
            </Switch>
          </div>
          <footer className="appFooter">
            <div className="navItem"><NavLink to="/todo">Todos</NavLink></div>
            <div className="navItem"><NavLink to="/social">Feed</NavLink></div>
            <div className="navItem"><NavLink to="/calendar">Calendar</NavLink></div>
            <div className="navItem"><NavLink to="/weather">Weather</NavLink></div>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
