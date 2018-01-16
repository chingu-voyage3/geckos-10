import React, { Component } from 'react';
import TimeAgo from 'react-timeago';

class RefreshFB extends Component {

    render(){
        return(
            <div className="RefreshFB">
                <button className="FBbtn"
                        onClick={this.props.refreshCallback}>
                        Refresh Feed
                </button>
                <p className='refreshDate'>Updated {' '}  
                    <TimeAgo 
                        date={this.props.refreshTimeStamp}
                        //The minimum number of seconds that the component should wait before updating 
                        minPeriod='5' />
                </p>
            </div>
        );
    }
}

export default RefreshFB;