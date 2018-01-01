/*global FB*/
//can also reference FB as window.FB

/*ISSUES
* Add indictor that refresh is working if there are no new posts.
* How to get photos associated with posts
* Handle instances when user is not logged into facebook (?)
* Works even after I logged out of facebook and into different account
* find user's locality for date

*/

/*After asking for post permission:
Submit for Login Review
Some of the permissions below have not been approved for use by Facebook.
Submit for review now or learn more. */

import React, { Component } from 'react';


class FBfeedItem extends Component {
    render () {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'2-digit', minute:'2-digit'};
        var postDate = new Date(this.props.date);

        return(
            <div className="FBfeedItem">
                <div className="postStory">{this.props.story}</div>
                <div className="postDate">{postDate.toLocaleDateString("en-US",options)}</div>
                <div className="postMessage">{this.props.message}</div>
            </div>
        );
    }
}

class PostToFB extends Component {
    //incomplete
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render () {
        return (
            <div>
                <button className="FBbtn">Post to Facebook</button>
            </div>
        );
    }
}

class FacebookFeed extends Component {

    constructor(props) {
        super(props)
        this.getFBPosts = this.getFBPosts.bind(this);
        this.refreshFeed = this.refreshFeed.bind(this);
        this.state = {
            //login info passed down from app through socialmedia component
            FBaccessToken: this.props.FBaccessToken,
            FBuid: this.props.FBuid,
            FBauthenticated: this.props.FBauthenticated,
            FBfeed: [], //stores fb post info
            refresh: true, //indicates whether app should make an api call to get post data
        }
    }

    renderFBfeed() {
        this.getFBPosts();
        return(
            <div id="facebookFeedContainer">
                {this.state.FBfeed.map( (FBitem, index) =>
                    <FBfeedItem  
                        key={FBitem.id}
                        date={FBitem.created_time}
                        message={FBitem.message}
                        story={FBitem.story}
                    />
                )}
            </div>
        );
    }

    getFBPosts() {
        //run only if the FB feed needs to be refreshed
        if (this.state.refresh){
            FB.api(
                "/"+ this.state.FBuid +"/feed",
                function (response) {
                if (response && !response.error) {
                    
                    console.log(response.data);
                    this.setState({
                        FBfeed: response.data,
                        refresh: false,
                    });
    
                }
                //The callback is made in a different context. You need to bind to this  
                //in order to have access to this.setState inside the callback
                }.bind(this)
            );
        }
 
    }

    refreshFeed(){
        //called by refresh button

        console.log("refresh");

        this.setState({
            refresh: true,
        });

    }    

    render (){
        return(
            <div>
                {this.state.FBauthenticated ? 
                    //If authenticated
                    <div id="facebook">
                    <h2>Facebook Feed</h2>
                    <PostToFB />
                    <button className="FBbtn"
                            onClick={this.refreshFeed}>
                            Refresh Feed
                    </button>
                    {this.renderFBfeed()}
                    </div>
                :
                //if not authenticated
                <h2>Log into Facebook to view your feed.</h2>

                }
            </div>
        );
    }
}

export default FacebookFeed;