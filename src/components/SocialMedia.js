/*global FB*/
//can also reference FB as window.FB

/*After asking for post permission:
Submit for Login Review
Some of the permissions below have not been approved for use by Facebook.
Submit for review now or learn more. */

import React, { Component } from 'react';

class FBPostfeed extends Component {
    render () {
        return(
            <div className="FBfeedItem">
                <div>{this.props.date}</div>
                <div>{this.props.story}</div>
                <div>{this.props.message}</div>
            </div>
        );
    }
}

class FacebookFeed extends Component {

    constructor(props) {
        super(props)
        this.initFB = this.initFB.bind(this);
        this.state = {
            //start out with both empty
            FBaccessToken: "",
            FBuid: "",
            FBfeed: [],
        }
    }

    initFB(response) {
        console.log("initFB")
        if (response.status === 'connected') {
            // the user is logged in and has authenticated the
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token 
            // and signed request each expire

            this.setState({
                FBuid: response.authResponse.userID,
                FBaccessToken: response.authResponse.accessToken,
            });
            //grab user posts
            FB.api(
                "/"+ this.state.FBuid +"/feed",
                function (response) {
                if (response && !response.error) {
                    //save returned posts to state
                   
                    console.log(response.data);
                    this.setState({
                        FBfeed: response.data,
                    });
                }
                //The callback is made in a different context. You need to bind to this in order to have access to this.setState inside the callback
                }.bind(this)
            );

        } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook, 
            // but has not authenticated your app
        } else {
            // the user isn't logged in to Facebook.
        }
        
    }


    componentDidMount() {
        //**When clicking back and forth between bottom menu items, like button stops appearing

        //The following code will give the basic version of the SDK where the options are set to their most common defaults. 
        //You should insert it directly after the opening <body> tag on each page you want to load it:

        //flag to check if FB is ready
        //var isLoaded = false;

        var initFbCallback = this.initFB

        //initialize the Javascript SDK
        window.fbAsyncInit = function() {
            FB.init({
            appId      : '1186050748193429',
            //With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML. If you're not using social plugins on the page, setting xfbml to false will improve page load times.
            xfbml      : true,
            version    : 'v2.11'
            });
            FB.AppEvents.logPageView();

            // Additional initialization code
            FB.getLoginStatus(function(response) {
                console.log("getLoginStatus")
                console.log(response.status)
                initFbCallback(response)
                
            });
            //
            //isLoaded = true;

        };

        
        //Load SDK asynchronously
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    };

    render (){
        return(

            <div id="facebook">
                <h2>Facebook Feed</h2>
                <div id="facebookContainer">
                    {this.state.FBfeed.map( (FBitem, index) =>
                        <FBPostfeed 
                            key={FBitem.id}
                            date={FBitem.created_time}
                            message={FBitem.message}
                            story={FBitem.story}
                            link={FBitem.link}
                            object={FBitem.object_attachment}
                        />
                    )}
                </div>
            </div>

        );
    }
}

class SocialMedia extends Component {

    render () {
        return (
            <div className="SocialMedia">
                <FacebookFeed />
            </div>
        );
    }
}

export default SocialMedia;