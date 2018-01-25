/*global FB*/
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import FacebookFeed from './facebook_components/Facebook';

class SocialMedia extends Component {

    constructor(props){
        super(props);
        this.state = {
            reload: false,
        }
    }

    render () {
        return (
            <div id="social-media">
                { //make sure facebook can't be loaded before FB SDK is initialized
                    (typeof(FB) !== 'undefined' && FB !== null )?
                        <FacebookFeed   {...this.props} />
                    :
                        //if it's not finished loading redirect to the root
                        <Redirect to="/" />

                }
                
            </div>
        );
    }
}

export default SocialMedia;