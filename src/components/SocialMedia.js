/*global FB*/
import React, { Component } from 'react';
import { Spinner } from "@blueprintjs/core";
import FacebookFeed from './facebook_components/Facebook';

class SocialMedia extends Component {


    render () {
        return (
            <div id="SocialMedia">
                { //make sure facebook can't be loaded before FB SDk is initialized
                    (typeof(FB) !== 'undefined' && FB !== null )?
                        <FacebookFeed   {...this.props} />
                    :
                        <div className="spinner">
                            SDK not finished loading
                            <Spinner /> 
                        </div>
                }
                
            </div>
        );
    }
}

export default SocialMedia;