import React, { Component } from 'react';
import FacebookFeed from './Facebook';

class SocialMedia extends Component {

    componentWillReceiveProps(nextProps) {
        console.log('SM receive props called');
    }

    render () {
        return (
            <div id="SocialMedia">
                <FacebookFeed   {...this.props} />
            </div>
        );
    }
}

export default SocialMedia;