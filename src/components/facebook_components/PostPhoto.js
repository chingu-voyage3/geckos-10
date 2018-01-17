/*global FB*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostPhoto extends Component {

    constructor(props){
        super(props)
        this.state = {
            labelText: 'Add a Photo',
        }
    }

    getFiles(event){
        console.log('Selected file:', event.target.files[0]);
        event.preventDefault()
        /* for (var i = 0; i < event.target.files.length(); i++){

        } */
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


    render(){
        return(
            <div>
                <label  className={this.props.isShowing}
                        id="photoBtnLabel"
                        htmlFor="photo_upload">
                        {this.state.labelText}
                </label>
                <input  type="file"
                        name="photo_upload"
                        id="photo_upload"
                        accept=".jpg, .jpeg, .bmp, .png, .gif, .tif, .tiff"
                        onChange={this.getFiles}
                        multiple
                        />
            </div>
        );
    }
}

PostPhoto.propTypes = {
    isShowing: PropTypes.string,
}

export default PostPhoto;