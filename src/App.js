/*global FB*/
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { app } from './store/store';
import { Spinner } from '@blueprintjs/core';

import Login from './components/Login';
import Logout from './components/Logout';
import Header from './components/Header';
import Footer from './components/Footer';

import SocialMedia from './components/SocialMedia';

class App extends Component {
  constructor() {
    super();
    this.initFBSDK = this.initFBSDK.bind(this);
    this.state = {
      authenticated: false,
      loading: true,
      email: '',
      name: '',
      FBaccessToken: '',
      FBuid: '',
      FBauthenticated: false,
    }
  }

  initFBSDK() {
    //The following code will give the basic version of the SDK where the options are set to their most common defaults. 
    //You should insert it directly after the opening <body> tag on each page you want to load it:


    //initialize the Javascript SDK
    window.fbAsyncInit = function () {
      FB.init({
        appId: '1186050748193429',
        //With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML. If you're not using social plugins on the page, setting xfbml to false will improve page load times.
        xfbml: true,
        version: 'v2.11'
      });
      FB.AppEvents.logPageView();

      // Additional initialization code
      FB.getLoginStatus(function (response) {
        console.log("FB response: " + response.status);
        if (response.status === 'connected') {
          // the user is logged in and has authenticated the
          // app, and response.authResponse supplies
          // the user's ID, a valid access token, a signed
          // request, and the time the access token 
          // and signed request each expire
          this.setState({
            FBuid: response.authResponse.userID,
            FBaccessToken: response.authResponse.accessToken,
            FBauthenticated: true,
          });

        } else if (response.status === 'not_authorized') {
          // the user is logged in to Facebook, 
          // but has not authenticated your app
        } else {
          // the user isn't logged in to Facebook.
        }

      }.bind(this));

    }.bind(this);


    //Load SDK asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.setState({
          authenticated: true,
          loading: false,
          name: !user.email ? user.providerData[0].email : user.email,
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false,
          email: '',
          name: '',
          FBaccessToken: '',
          FBuid: '',
          FBauthenticated: false,
        })
      }
    })

    this.initFBSDK();
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
              <Route exact path="/todo" component="" />
              <Route path="/social" component={() => <SocialMedia {...this.state} />} />
              <Route path="/calendar" component="" />
              <Route path="/weather" component="" />
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
