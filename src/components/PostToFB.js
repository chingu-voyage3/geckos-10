import React, { Component } from 'react';

class PostToFB extends Component {
    //incomplete
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.makePost = this.makePost.bind(this);
    }

    makePost(){
        console.log(this.state.value);
    }


    handleChange(event) {
        this.setState({value: event.target.value});
      }

    render () {
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <button className="FBbtn"
                        onClick={this.makePost}>
                    Post to Facebook
                </button>
            </div>
        );
    }
}

export default PostToFB;