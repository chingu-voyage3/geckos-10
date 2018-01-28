/*global FB*/
//can also reference FB as window.FB

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Spinner } from "@blueprintjs/core";
import FBfeedItem from "./FBfeedItem";
import PostToFB from "./PostToFB";
import RefreshFB from "./RefreshFB";
import { Redirect } from "react-router-dom";
import { app, facebookProvider, cookies } from "../../store/store";

class FacebookFeed extends Component {
  constructor(props) {
    super(props);
    this.getFBPosts = this.getFBPosts.bind(this);
    this.refreshFeed = this.refreshFeed.bind(this);
    this.getOlderPosts = this.getOlderPosts.bind(this);
    this.checkFBAuth = this.checkFBAuth.bind(this);
    this.state = {
      //login info passed down from app through socialmedia component
      FBauthenticated: this.props.FBauthenticated,
      FBaccessToken: this.props.FBaccessToken,
      FBfeed: [], //stores fb post info
      refresh: true, //indicates whether app should make an api call to get post data
      refreshTimeStamp: "",
      pagePrev: "",
      pageNext: "",
      loading: true
    };
    this.timeFormat = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
    this.locale = "en-US";
  }

  componentWillMount() {
    // Try to load from cookie as well
    if (
      this.state.FBauthenticated === false ||
      typeof this.state.FBaccessToken === "undefined"
    ) {
      const accessToken = cookies.get("FBaccessToken");
      if (accessToken) {
        this.setState({
          FBauthenticated: true,
          FBaccessToken: accessToken
        });
      } else {
        this.setState({
          FBauthenticated: false
        });
      }
    }
  }

  checkFBAuth() {
    //check that access token is valid
    FB.api(
      "/debug_token?input_token=" + this.state.FBaccessToken,
      {
        access_token: this.state.FBaccessToken
      },
      function (response) {
        if (response && !response.error) {
          //Don't need to return anything of access token had no issues
          //console.log(response);
        } else {
          //if theres an issue log out user for now
          //console.log(response.error.message);
          return <Redirect to="/logout" />;
        }
      }
    );
  }

  renderFBfeed() {
    this.getFBPosts();
    return (
      <div id="fb__feed_container">
        {this.checkFBAuth()}
        {this.state.FBfeed.map(FBitem =>
          <FBfeedItem
            key={FBitem.id}
            FBitem={FBitem}
            timeFormat={this.timeFormat}
            locale={this.locale}
          />
        )}
      </div>
    );
  }

  getFBPosts() {
    //run only if the FB feed needs to be refreshed
    if (this.state.refresh) {
      FB.api(
        "/me/feed?fields=permalink_url,message,story,created_time,description,full_picture,link,name,status_type,type,from",
        {
          access_token: this.state.FBaccessToken
        },
        function (response) {
          if (response && !response.error) {
            this.setState({
              FBfeed: response.data,
              refresh: false,
              refreshTimeStamp: new Date().getTime(),
              pagePrev: response.paging.previous,
              pageNext: response.paging.next,
              loading: false
            });
          } else {
            //console.log(response.error.message);
            alert(response.error.messsage);
          }
          //The callback is made in a different context. You need to bind to this
          //in order to have access to this.setState inside the callback
        }.bind(this)
      );
    }
  }

  getOlderPosts() {
    FB.api(
      this.state.pageNext,
      {
        access_token: this.state.FBaccessToken
      },
      function (response) {
        if (response && !response.error) {
          //check to see if data is empty and tell user there are no new posts

          this.setState({
            FBfeed: this.state.FBfeed.concat(response.data),
            pagePrev: response.paging.previous,
            pageNext: response.paging.next
          });
        } else {
          alert(response.error.message);
        }
        //The callback is made in a different context. You need to bind to this
        //in order to have access to this.setState inside the callback
      }.bind(this)
    );
  }

  refreshFeed() {
    this.setState({
      refresh: true
    });
  }

  handleFBResult = result => {
    const accessToken = result.credential.accessToken;

    cookies.set("FBaccessToken", accessToken);
    this.setState({
      FBauthenticated: true,
      FBaccessToken: accessToken
    });
    this.forceUpdate();
  };

  authWithFacebook() {
    let FBconnected = false;
    app.auth().currentUser.providerData.forEach(function (profile) {
      if (profile.providerId === "facebook.com") {
        FBconnected = true;
      }
    });
    if (FBconnected) {
      app.auth().signInWithPopup(facebookProvider).then((result, error) => {
        if (!error) {
          this.handleFBResult(result);
        }
      });
    } else {
      app
        .auth()
        .currentUser.linkWithPopup(facebookProvider)
        .then((result, error) => {
          if (!error) {
            this.handleFBResult(result);
          }
        });
    }
  }
  render() {
    //check if access token has been set
    if (FB === null) {
      //if not set then redirect to logout
      return <Redirect to="/" />;
    }
    return (
      <div>
        {this.state.FBauthenticated
          ? //If authenticated
          <div id="fb">

            {this.state.loading
              ? <div className="fb__spinner">
                <Spinner />
              </div>
              : <div id="fb__sidebar">
                <h1>Facebook</h1>
                <PostToFB
                  {...this.state}
                  refreshCallback={this.refreshFeed}
                />
                <RefreshFB
                  {...this.state}
                  refreshCallback={this.refreshFeed}
                />
              </div>}

            {this.renderFBfeed()}

            <div id="fb__footer">
              {this.state.loading
                ? ""
                : <button className="fb__btn" onClick={this.getOlderPosts}>
                  See Older Posts
                    </button>}
            </div>
          </div>
          : //if not authenticated
            <div className="fb--not-logged-in">
                <div className="fb--login">
                    <h2>Log into Facebook to view your feed.</h2>
                    <button
                    className="pt-button pt-intent-primary"
                    onClick={() => this.authWithFacebook()}
                    >
                    Log In with Facebook
                    </button>
                </div>
            </div>
          }
      </div>
    );
  }
}

FacebookFeed.propTypes = {
  FBaccessToken: PropTypes.string,
  FBauthenticated: PropTypes.bool
};
export default FacebookFeed;
