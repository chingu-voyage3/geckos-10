/*global FB*/
import React, { Component } from 'react';
import FacebookFeed from './facebook_components/Facebook';

class SocialMedia extends Component {

    componentWillReceiveProps(nextProps) {
        console.log('SM receive props called');
    }

    render () {
        return (
            <div id="SocialMedia">
                { //make sure facebook can't be loaded before FB SDk is initialized
                    (typeof(FB) !== 'undefined' && FB !== null )?
                        <FacebookFeed   {...this.props} />
                    :
                        ""
                }
                
            </div>
        );
    }
}

export default SocialMedia;