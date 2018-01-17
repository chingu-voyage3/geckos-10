/*global FB*/
//can also reference FB as window.FB

/*ISSUES
* Handle instances when user is not logged into facebook (?)
* find user's locality for date, currently using en-us
*/

/*After asking for post permission:
Submit for Login Review
Some of the permissions below have not been approved for use by Facebook.
Submit for review now or learn more. */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from "@blueprintjs/core";
import FBfeedItem from './FBfeedItem';
import PostToFB from './PostToFB';
import RefreshFB from './RefreshFB';

class FacebookFeed extends Component {
  constructor(props) {
    super(props);
    this.getFBPosts = this.getFBPosts.bind(this);
    this.refreshFeed = this.refreshFeed.bind(this);
    this.getOlderPosts = this.getOlderPosts.bind(this);
    this.state = {
        //login info passed down from app through socialmedia component
        FBauthenticated: this.props.FBauthenticated,
        FBaccessToken: this.props.FBaccessToken,
        FBfeed: [], //stores fb post info
        refresh: true, //indicates whether app should make an api call to get post data
        refreshTimeStamp: "",
        pagePrev: "",
        pageNext: "",
        loading: true,
    };
    this.timeFormat = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    };
    this.locale = "en-US";
  }

    renderFBfeed() {
        this.getFBPosts();
        return (
            <div id="facebookFeedContainer">
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
                        console.log(response);
                        this.setState({
                            FBfeed: response.data,
                            refresh: false,
                            refreshTimeStamp: new Date().getTime(),
                            pagePrev: response.paging.previous,
                            pageNext: response.paging.next,
                            loading: false
                        });
                    } else {
                        console.log(response.error);
                    }
                //The callback is made in a different context. You need to bind to this
                //in order to have access to this.setState inside the callback
                }.bind(this)
            );
        }
    }


    getOlderPosts(){

        FB.api(
            this.state.pageNext,
            {
                access_token: this.state.FBaccessToken
            },
            function (response) {
            if (response && !response.error) {
                
                console.log(response);
                
                //check to see if data is empty and tell user there are no new posts

                this.setState({
                    FBfeed: this.state.FBfeed.concat(response.data),
                    pagePrev: response.paging.previous,
                    pageNext: response.paging.next,
                });

            }
            else {
                console.log(response.error)
            }
            //The callback is made in a different context. You need to bind to this  
            //in order to have access to this.setState inside the callback
            }.bind(this)
        );
    }

    refreshFeed(){

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

                        {this.state.loading ?
                            <div className="spinner">
                                <Spinner /> 
                            </div>
                        :
                        <div id="FBSidebar">
                            <h1>Facebook</h1>
                            <PostToFB {...this.state} refreshCallback={this.refreshFeed} />
                            <RefreshFB {...this.state} refreshCallback={this.refreshFeed} />
                        </div>
                        }
                        
                        
                        {this.renderFBfeed()}

                        <div id="FBFooter">
                            {this.state.loading ?
                            "":
                            <button className="FBbtn"
                                    onClick={this.getOlderPosts}>
                                See Older Posts
                            </button>

                            }
                        </div>
                    </div>
                :
                //if not authenticated
                <div id="facebook">
                    <h2>Log into Facebook to view your feed.</h2>
                </div>
                }
            </div>
        );
    }

}

FacebookFeed.propTypes = {
    FBaccessToken: PropTypes.string,
    FBauthenticated: PropTypes.bool,
}
export default FacebookFeed;
