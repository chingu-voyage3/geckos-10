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
import FBfeedItem from './FBfeedItem';
import PostToFB from './PostToFB';
import TimeAgo from 'react-timeago';



class FacebookFeed extends Component {

    constructor(props) {
        super(props)
        this.getFBPosts = this.getFBPosts.bind(this);
        this.refreshFeed = this.refreshFeed.bind(this);
        this.getOlderPosts = this.getOlderPosts.bind(this);
        this.state = {
            //login info passed down from app through socialmedia component
            FBaccessToken: this.props.FBaccessToken,
            FBuid: this.props.FBuid,
            FBauthenticated: this.props.FBauthenticated,
            FBfeed: [], //stores fb post info
            refresh: true, //indicates whether app should make an api call to get post data
            refreshTimeStamp: '',
            pagePrev: '',
            pageNext: '',
        };
        this.timeFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'2-digit', minute:'2-digit'};
        this.locale = 'en-US';
    }

    renderFBfeed() {
        this.getFBPosts();
        return(
            <div id="facebookFeedContainer">
                {this.state.FBfeed.map( (FBitem, index) =>
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
        if (this.state.refresh){
            FB.api(
                "/me/feed?fields=permalink_url,message,story,created_time,description,full_picture,link,name,status_type,type,from",
                function (response) {
                if (response && !response.error) {
                    
                    console.log(response);
                    this.setState({
                        FBfeed: response.data,
                        refresh: false,
                        refreshTimeStamp: new Date().getTime(),
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
 
    }


    getOlderPosts(){
        console.log("older posts");
        FB.api(
            this.state.pageNext,
            function (response) {
            if (response && !response.error) {
                
                console.log(response);
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
                        <PostToFB {...this.state} />
                        <button className="FBbtn"
                                onClick={this.refreshFeed}>
                                Refresh Feed
                        </button>
                        <p className='refreshDate'>Updated {' '}  
                            <TimeAgo 
                                date={this.state.refreshTimeStamp}
                                //The minimum number of seconds that the component should wait before updating 
                                minPeriod='5' />
                        </p>
                        {this.renderFBfeed()}
                        <button className="FBbtn"
                                onClick={this.getOlderPosts}>
                            See Older Posts
                        </button>
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