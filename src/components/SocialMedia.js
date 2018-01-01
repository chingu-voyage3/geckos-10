import React, { Component } from 'react';
import FacebookFeed from './Facebook';

class SocialMedia extends Component {

    componentWillReceiveProps(nextProps) {
        console.log('SM receive props called');
    }

    render () {
        return (
            <div id="SocialMedia">
                <FacebookFeed   FBuid={this.props.FBuid}
                                FBaccessToken={this.props.FBaccessToken}
                                FBauthenticated={this.props.FBauthenticated} />
            </div>
        );
    }
}

export default SocialMedia;