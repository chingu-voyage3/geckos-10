import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Spinner } from "@blueprintjs/core";
import { app } from "../store/store";
import Cookies from "universal-cookie";

class Logout extends Component {
  constructor() {
    super();
    this.deleteCookie = this.deleteCookie.bind(this);
    this.state = {
      redirect: false
    };
  }

  deleteCookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=" + new Date().toUTCString() + ";";
  }

  componentWillMount() {
    app.auth().signOut().then(() => {
      //make sure facebook cookies get properly deleted when logging out
      this.deleteCookie("fblo_1186050748193429");
      this.setState({ redirect: true });
      const cookies = new Cookies();
      cookies.remove("FBaccessToken");
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
