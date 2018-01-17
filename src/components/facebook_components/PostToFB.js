/*global FB*/
import React, { Component } from "react";
import PropTypes from 'prop-types';
import GetFiles from "./GetFiles.js";

class PostToFB extends Component {
    //incomplete
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.makePost = this.makePost.bind(this);
        this.getPhotos = this.getPhotos.bind(this);
        this.expandPostForm = this.expandPostForm.bind(this);
        this.minimizePostForm = this.minimizePostForm.bind(this);
        this.uploadPhotos = this.uploadPhotos.bind(this);
        this.state = {
            message: "",
            textarea: "small",
            isShowing: "hide",
            refreshCheck: false,
            photos: [], //array to hold photos to be added to post
            FBaccessToken: this.props.FBaccessToken,
        };
    }


    uploadPhotos(){
        /*       FB.api(
            "/me/photos?published=false",
            "POST",
            {
                "source": "{image-url}"
            },
            function (response) {
              if (response && !response.error) {
                
              }
            }
        ); */
    }

    makePost(event){
        event.preventDefault();

        //check that there are photos to upload
        if (this.state.photos.length > 0) {
            this.uploadPhotos();
        }

        FB.api(
            "/me/feed",
            "POST",
            {
              access_token: this.state.FBaccessToken,
              message: this.state.message
            },
            function (response) {
              if (response && !response.error) {
                this.setState({
                  message: "",
                  photos: [],
                  textarea: "small",
                  isShowing: "hide"
                });
                //refresh the feed after making a new post is user has checked the box
                this.state.refreshCheck ? this.props.refreshCallback() : "" ;

              } else {
                alert("Could not post to Facebook");
              }
            }.bind(this)
          );
        
        
        
    }

    expandPostForm() {
        this.setState({
            textarea: "big",
            isShowing: "show"
        });
    }

    minimizePostForm(event) {
        //only do it if there's no message so that it doesn't disappear on the user when they're trying to submit
        //and if they aren't showing a picture
        event.preventDefault();
        if (this.state.message ==='' ) {
            this.setState({
                textarea: 'small',
                isShowing: 'hide',
            });
        }
        
    }
    

  getPhotos(files) {
    console.log("photo ids: ");
    for (var i = 0; i < files.length; i++) {
      console.log(files[i]);
    }
    this.setState({
      photos: files
    });
  }

  handleChange(event) {
    //handles change on both textarea and checkbox
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

}

    render () {
        return (
            <div>
                <form   id="FBPostForm" 
                        onSubmit={this.makePost}
                        onFocus={this.expandPostForm} 
                        //onBlur={this.minimizePostForm}
                        encType="multipart/form-data"
                        >
                    <textarea   className={this.state.textarea} 
                                value={this.state.message}
                                name="message" 
                                onChange={this.handleChange}
                                placeholder="Post to Facebook"
                                />
                    <div className="formButtonsContainer">
                        
                        <div id="refreshCheckGroup" lassName={this.state.isShowing}>
                            <input  type="checkbox"
                                    name="refreshCheck" 
                                    checked={this.state.refreshCheck}
                                    onChange={this.handleChange}
                                    className={this.state.isShowing}
                                    />
                            <label  htmlFor="refreshCheck" 
                                    className={this.state.isShowing}
                                    >
                                Refresh after posting
                            </label>`
                        </div>
                        
                        <GetFiles {...this.state} getPhotoCallback={this.getPhotos}/> 
                        <input  className={this.state.isShowing}
                                id="FBsubmit" 
                                type="submit" 
                                value="Post to Facebook" 
                                />
                        <button className={this.state.isShowing} onClick={this.minimizePostForm}>
                            Collapse
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

PostToFB.propTypes = {
    refreshCallback: PropTypes.func,
    FBaccessToken: PropTypes.string,
}

export default PostToFB;
