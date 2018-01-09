import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Spinner } from "@blueprintjs/core";
import { app } from "../store/store";

class Logout extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }
  componentWillMount() {
    app.auth().signOut().then(() => {
      this.setState({ redirect: true });
    });
  }
  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />;
    }
    return (
      <div className="logoutSpinner">
        <h3>Logging Out...</h3>
        <Spinner />
      </div>
    );
  }
}

export default Logout;
