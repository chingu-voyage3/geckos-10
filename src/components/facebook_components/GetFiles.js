/*global FB*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GetFiles extends Component {

    constructor(props){
        super(props)
        this.getFiles = this.getFiles.bind(this);
        this.state = {
            labelText: 'Add a Photo',
        }
    }

    getFiles(event){
        event.preventDefault()
        
        var numFiles = event.target.files.length;
        var text = '';
        

        if (numFiles == 0){
            text = 'No Photos Selected';
        }
        else if (numFiles == 1) {
            text = '1 Photo Selected';
        }
        else {
            text = numFiles + ' Photos Selected';
        }


        for (var i = 0; i < numFiles; i++){
            //check size of files
            //If you upload a PNG file, try keep the file size below 1 MB. PNG files larger than 1 MB may appear pixelated after upload.
            //We recommend uploading photos under 4MB.
            console.log('Selected file:', event.target.files[i]);
            /* if (event.target.files[i].size > 4000000){
                alert(event.target.files[i].name + " is too large. Please select an image that is smaller than 4MB.")
                //eventually limit image size**
            } */

            
        }

        this.setState({
            labelText: text,
        });

        this.props.getPhotoCallback(event.target.files);


    }


    render(){
        return(
            <div>
                <label  className={this.props.isShowing}
                        id="fb__photo_btn_label"
                        htmlFor="photo_upload">
                        {this.state.labelText}
                </label>
                <input  type="file"
                        name="photo_upload"
                        id="fb__photo_upload"
                        accept=".jpg, .jpeg, .bmp, .png, .gif, .tif, .tiff"
                        onChange={this.getFiles}
                        multiple
                        />
            </div>
        );
    }
}

GetFiles.propTypes = {
    isShowing: PropTypes.string,
    getPhotoCallback: PropTypes.func,
}

export default GetFiles;