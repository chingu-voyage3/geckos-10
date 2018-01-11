/*global FB*/
import React, { Component } from 'react';

class PostToFB extends Component {
    //incomplete
    constructor(props) {
        super(props)
        this.state = {
            message: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.makePost = this.makePost.bind(this);
    }

    makePost(){
        console.log(this.state.value);
        FB.api(
            "/me/feed",
            "POST",
            {
                "message": this.state.message
            },
            function (response) {
              if (response && !response.error) {
                /* handle the result */
                alert('Successfully posted update!')
              }
            }
        );
    }


    handleChange(event) {
        this.setState({message: event.target.value});
      }

    render () {
        return (
            <div>
                <input type="text" value={this.state.message} onChange={this.handleChange} />
                <button className="FBbtn"
                        onClick={this.makePost}>
                    Post to Facebook
                </button>
            </div>
        );
    }
}

export default PostToFB;