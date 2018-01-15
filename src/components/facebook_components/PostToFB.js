/*global FB*/
import React, { Component } from 'react';
import PostPhoto from './PostPhoto.js';

class PostToFB extends Component {
    //incomplete
    constructor(props) {
        super(props)
        this.handleFocus = this.handleFocus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.makePost = this.makePost.bind(this);
        this.getPhotoIDs = this.getPhotoIDs.bind(this);
        this.state = {
            message: '',
            textarea: 'small',
            isShowing: 'hide',
            photoIDs: [], //array to hold strings of IDs
        }

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
                        photoIDs: [],
                        textarea: 'small',
                        isShowing: 'hide',
                    });
                    //refresh the feed after making a new post
                    this.props.refreshCallback();
                    
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
        //and if they aren't showing a picture
        if (this.state.message ==='' ) {
            this.setState({
                textarea: 'small',
                isShowing: 'hide',
            });
        }
        
    }


    getPhotoIDs(photoIDs) {
        console.log("photo ids: ");
        for (var i = 0; i <photoIDs.length(); i++){
            console.log(photoIDs[i]);
        }
        this.setState({
            photoIDs: photoIDs,
        });
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
                    {/*<PostPhoto {...this.state} photoIDCallback={this.getPhotoIDs}/> */}
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