/*global FB*/
import React, { Component } from "react";
import PropTypes from 'prop-types';
//import GetFiles from "./GetFiles.js";

class PostToFB extends Component {
    //incomplete
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getPhotos = this.getPhotos.bind(this);
        this.expandPostForm = this.expandPostForm.bind(this);
        this.minimizePostForm = this.minimizePostForm.bind(this);
        this.uploadPhotos = this.uploadPhotos.bind(this);
        this.makePost = this.makePost.bind(this);
        this.encodePhoto = this.encodePhoto.bind(this);
        this.state = {
            message: "",
            textarea: "fb--small",
            isShowing: "fb--hide",
            displayCheckbox: "fb--hide",
            refreshCheck: false,
            photos: [], //photos user selected to be added to post
            mediaAttachments: [],
            FBaccessToken: this.props.FBaccessToken,
        };
    }



    encodePhoto(photo){
        var reader = new FileReader();

        reader.onload = function(e) {
            
            var arrayBuffer = e.target.result;

            console.log('photo type: '+photo.type)
            
            var blob = new Blob([arrayBuffer], { type: photo.type });

            // We will use FormData object to create multipart/form request
            var pictureData = new FormData();
            //pictureData.append('access_token', this.state.FBaccessToken);
            pictureData.append('source', blob);
            

            return pictureData;
        }.bind(this)

        return reader.readAsArrayBuffer(photo);

    }

    uploadPhotos(){
        //not sure if this is async or not.... maybe not will have to change if it ends up being async... **
        //store photo ids returned from api call here
        var temp = []

        for (var i =0; i < this.state.photos.length; i++){
            //each photo must be uploaded in a separate api call
            console.log("uploading: "+ this.state.photos[i].name);

            var encodedRequest = this.encodePhoto(this.state.photos[i]);

            //upload to facebook
            FB.api(
                //"/me/photos?published=false", //upload to get ids to add to status update
                "/me/photos?access_token="+this.state.FBaccessToken, //upload to get ids to add to status update
                "POST",
                encodedRequest,
                function (response) {
                  if (response && !response.error) {
                    //once successfully gotten the photos add them to the array of photo ids
                    temp.push({"media_fbid": response.id});
                    console.log(response);
                  }
                  else {
                    alert(response.error.message);
                  }
                }.bind(this)
            );

        }

        this.setState({
            mediaAttachments: temp
        });
        
    }

    makePost(postParameters){
        FB.api(
            "/me/feed",
            "POST",
            postParameters,
            function (response) {
              if (response && !response.error) {
                this.setState({
                  message: "",
                  photos: [],
                  mediaAttachments: [],
                  textarea: "fb--small",
                  isShowing: "fb--hide"
                });

                //refresh the feed after making a new post is user has checked the box
                this.state.refreshCheck ? this.props.refreshCallback() : "" ;

              } else {
                alert(response.error.message);
              }
            }.bind(this)
          );
        
    }

    handleSubmit(event){
        event.preventDefault();

        var postParam = {
            access_token: this.state.FBaccessToken,
            message: this.state.message,
        };

        //check that there are photos to upload
        if (this.state.photos.length > 0) {
            this.uploadPhotos();
            
/*             for (var i = 0; i < this.state.mediaAttachments.length; i++ ) {
                postParam['attached_media['+i+']'] = this.state.mediaAttachments[0];
            } */
            
            
        }

        else {
            
        
            this.makePost(postParam);
        }
        


        
    }

    expandPostForm() {
        this.setState({
            textarea: "fb--big",
            isShowing: "fb--show"
        });
    }

    minimizePostForm(event) {
        //only do it if there's no message so that it doesn't disappear on the user when they're trying to submit
        //and if they aren't showing a picture
        event.preventDefault();
        if (this.state.message ==='' ) {
            this.setState({
                textarea: 'fb--small',
                isShowing: 'fb--hide',
                displayCheckbox: 'fb--hide',
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

    
    //Display checkbox only when there's text in the textarea
    if (value !== '' && this.state.isShowing === 'fb--show'){
        
        this.setState({
            displayCheckbox: 'fb--show',
            [name]: value
        });
    }
    else {
        this.setState({
            displayCheckbox: 'fb--hide',
            [name]: value
        });
    }

}

    render () {
        return (
            <div>
                <form   id="fb__post_form" 
                        onSubmit={this.handleSubmit}
                        onFocus={this.expandPostForm} 
                        onBlur={this.minimizePostForm}
                        encType="multipart/form-data"
                        >
                    <textarea   className={this.state.textarea} 
                                value={this.state.message}
                                name="message" 
                                onChange={this.handleChange}
                                placeholder="Post to Facebook"
                                />
                    <div className="fb__form_buttons_container">
                        
                        <div id="fb__refresh_checkgroup" className={this.state.displayCheckbox}>
                            <input  type="checkbox"
                                    name="refreshCheck" 
                                    checked={this.state.refreshCheck}
                                    onChange={this.handleChange}
                                    />
                            <label  htmlFor="refreshCheck" >
                                Refresh after posting
                            </label>`
                        </div>
                        
                        {/* <GetFiles {...this.state} getPhotoCallback={this.getPhotos}/> 
                        <button className={this.state.isShowing} onClick={this.minimizePostForm}>
                            Collapse
                        </button> */}
                        
                        <input  className={this.state.isShowing}
                                id="fb__submit" 
                                type="submit" 
                                value="Post to Facebook" 
                                />
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
