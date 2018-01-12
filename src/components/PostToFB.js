/*global FB*/
import React, { Component } from 'react';

class PostToFB extends Component {
    //incomplete
    constructor(props) {
        super(props)
        this.handleFocus = this.handleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            message: '',
            textarea: 'small',
            isShowing: 'hide',
        }

        this.handleChange = this.handleChange.bind(this);
        this.makePost = this.makePost.bind(this);
    }

    makePost(event){

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
        this.setState({
            message: '',
        });
        
        event.preventDefault();
    }


    handleChange(event) {
        this.setState({message: event.target.value});
    }

    handleFocus(){
        if (this.state.textarea === 'small'){
            this.setState({
                textarea: 'big',
                isShowing: 'show',
            });
        }
        else {
            this.setState({
                textarea: 'small',
                isShowing: 'hide',
            });
        }
    }



    render () {
        return (
            <div>
                <form id="FBPostForm" onSubmit={this.makePost}>
                    <textarea className={this.state.textarea} 
                              value={this.state.message} 
                              onChange={this.handleChange}
                              onFocus={this.handleFocus} 
                              onBlur={this.handleFocus}
                              placeholder="Post to Facebook"
                              />
                    <input className={this.state.isShowing} type="submit" value="Post to Facebook" />
                </form>
            </div>
        );
    }
}

export default PostToFB;