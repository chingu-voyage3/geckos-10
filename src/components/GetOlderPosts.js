/*global FB*/
//can also reference FB as window.FB

import React, { Component } from 'react';

class GetOlderPosts extends Component {
    
    constructor(props){
        super(props)
        this.getOlderPosts = this.getOlderPosts.bind(this);
        this.state = {

        }
    }

    getOlderPosts(){
        console.log("older posts");
        FB.api(
            this.props.pageNext,
            function (response) {
            if (response && !response.error) {
                
                console.log(response);
                //TO FIX, CANT SET STATE BECAUSE CHILD NOT PARENT
                this.setState({
                    FBfeed: this.FBfeed.concat(response.data),
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

    render(){
        return (
            <button className="FBbtn"
                    onClick={this.getOlderPosts}>
                See Older Posts
            </button>
        );
    }
}

export default GetOlderPosts;