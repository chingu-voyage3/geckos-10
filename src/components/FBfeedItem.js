import React, { Component } from 'react';

class FBfeedItem extends Component {

    renderHeader() {
        var postDate = new Date(this.props.FBitem.created_time);
        return (
            <div className="postHeader">
                {//If the story exists display that, if not display who the post is from
                    this.props.FBitem.story ?
                    <div className="postStory">{this.props.FBitem.story}</div>
                    :
                    <div className="postStory">{this.props.FBitem.from.name}</div>
                }

                <div className="postDate">
                    <a href={this.props.FBitem.permalink_url} target="_blank">
                        {postDate.toLocaleDateString(this.props.locale, this.props.timeFormat)}
                    </a>
                </div>
            </div>
        );
    }

    renderFooter(){
        return(
            <div className="postFooter">
                <i className="fa fa-facebook-square fa-2x" aria-hidden="true"></i>
            </div>
        );
    }

    renderBody(){
        //Determine the type of post in order to format it correctly

        if (this.props.FBitem.type === "status"){
            //many different kinds of status posts
            //mobile_status_update, created_note, added_photos, added_video, shared_story, created_group, created_event, wall_post, app_created_story, published_story, tagged_in_photo, approved_friend
            return(
                <div className="postBody">

                    {//if the post has commentary from the poster
                        this.props.FBitem.message ? 
                        <div className="postMessage">{this.props.FBitem.message}</div> 
                        : 
                        "" 
                    }
                    

                </div>
            );

        }
        else if (this.props.FBitem.type === "photo"){
            //post includes photo, doesnt specify who posted it
            return(
                <div className="postBody">

                    {//if the post has commentary from the poster
                        this.props.FBitem.message ? 
                        <div className="postMessage">{this.props.FBitem.message}</div> 
                        : 
                        "" 
                    }
                    <a href={this.props.FBitem.link} target="_blank">
                        <img src={this.props.FBitem.full_picture} alt={this.props.FBitem.name} />
                    </a>

                </div>
            );

        }

        else if (this.props.FBitem.type === "link"){
            return (
                <div className="postBody">

                    {//if the post has commentary from the poster
                        this.props.FBitem.message ? 
                        <div className="postMessage">{this.props.FBitem.message}</div> 
                        : 
                        "" 
                    }
                
                    <div className="linkBox">
                        <a href={this.props.FBitem.link} target="_blank">
                            {this.props.FBitem.name}
                        </a>
                        {
                            this.props.FBitem.full_picture ?
                            <img alt={this.props.FBitem.name} src={this.props.FBitem.full_picture} />
                            :
                            ""
                        }
                    </div>
                    
                </div>
            );

        }

        else if (this.props.FBitem.type === "video"){
            return(
                <p>I am a video post</p>
            );
        }
        else {
        //post is an offer
            return(
                <p>I am an offer post</p>
            );
        }
    }

    render() {
        
        
       return(
            <div className="FBfeedItem">
                            
                {this.renderHeader()}

                {this.renderBody()}

                {this.renderFooter()}

            </div>
       );
    }
}

export default FBfeedItem;