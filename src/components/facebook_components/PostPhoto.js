/*global FB*/
import React, { Component } from 'react';

class PostPhoto extends Component {

    constructor(props){
        super(props)

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
                <input  className={this.props.isShowing}
                        type="file"
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

export default PostPhoto;