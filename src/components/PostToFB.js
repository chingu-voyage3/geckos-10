/*global FB*/
import React, { Component } from 'react';

class PostToFB extends Component {
    //incomplete
    constructor(props) {
        super(props)
        this.handleFocus = this.handleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.makePost = this.makePost.bind(this);
        this.state = {
            message: '',
            textarea: 'small',
            isShowing: 'hide',
        }

        this.handleChange = this.handleChange.bind(this);
        this.makePost = this.makePost.bind(this);
    }

    makePost(event){
        event.preventDefault();

        FB.api(
            "/me/feed",
            "POST",
            {
                "message": this.state.message
            },
            function (response) {
                if (response && !response.error) {
                
                    this.setState({
                        message: '',
                        textarea: 'small',
                        isShowing: 'hide',
                    });
                }
                else {
                    alert("Could not post to Facebook");
                }
            }.bind(this)
        );
        
        
        
    }


    handleChange(event) {
        this.setState({message: event.target.value});
    }

    handleFocus(){

        this.setState({
            textarea: 'big',
            isShowing: 'show',
        });

    }

    handleBlur() {
        //only do it if there's no message so that it doesn't disappear on the user when they're trying to submit
        if (this.state.message ==='') {
            this.setState({
                textarea: 'small',
                isShowing: 'hide',
            });
        }
    }

    render () {
        return (
            <div>
                <form   id="FBPostForm" 
                        onSubmit={this.makePost}
                        onFocus={this.handleFocus} 
                        onBlur={this.handleBlur}
                        >
                    <textarea   className={this.state.textarea} 
                                value={this.state.message} 
                                onChange={this.handleChange}
                                placeholder="Post to Facebook"
                                />
                    <input  className={this.state.isShowing}
                            type="file"
                            name="FBPostPhoto"
                            />
                    <input  className={this.state.isShowing} 
                            type="submit" 
                            value="Post to Facebook" 
                            />
                </form>
            </div>
        );
    }
}

export default PostToFB;