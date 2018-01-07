import React, { Component } from 'react';

class PostToFB extends Component {
    //incomplete
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    makePost(){
        console.log("make post");
    }

    render () {
        return (
            <div>
                <button className="FBbtn"
                        onClick={this.makePost}>
                    Post to Facebook
                </button>
            </div>
        );
    }
}

export default PostToFB;