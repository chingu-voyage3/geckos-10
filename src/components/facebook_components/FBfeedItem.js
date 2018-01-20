import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FBfeedItem extends Component {

    renderHeader() {
        var postDate = new Date(this.props.FBitem.created_time);
        return (
            <div className="fb__post_header">
                {//If the story exists display that, if not display who the post is from
                    this.props.FBitem.story ?
                    <div className="fb__post_story">{this.props.FBitem.story}</div>
                    :
                    <div className="fb__post_story">{this.props.FBitem.from.name}</div>
                }

                <div className="fb__post_date">
                    <a href={this.props.FBitem.permalink_url} target="_blank">
                        {postDate.toLocaleDateString(this.props.locale, this.props.timeFormat)}
                    </a>
                </div>
            </div>
        );
    }

    renderFooter(){
        return(
            <div className="fb__post_footer">
                <i className="fa fa-facebook-square fa-lg" aria-hidden="true"></i>
            </div>
        );
    }

    renderBody(){
        //Determine the type of post in order to format it correctly

        if (this.props.FBitem.type === "status"){
            //many different kinds of status posts
            //mobile_status_update, created_note, added_photos, added_video, shared_story, created_group, created_event, wall_post, app_created_story, published_story, tagged_in_photo, approved_friend
            return(
                <div className="fb__post_body">

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
                <div className="fb__post_body">

                    {//if the post has commentary from the poster
                        this.props.FBitem.message ? 
                        <div className="fb__post_message">{this.props.FBitem.message}</div> 
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
                <div className="fb__post_body">

                    {//if the post has commentary from the poster
                        this.props.FBitem.message ? 
                        <div className="fb__post_message">{this.props.FBitem.message}</div> 
                        : 
                        "" 
                    }
                
                    <div className="fb__content_box">
                        <a href={this.props.FBitem.link} target="_blank">
                            {this.props.FBitem.name}
                        </a>
                        
                        {
                            this.props.FBitem.full_picture ?
                            <div>
                                <br />
                                <img alt={this.props.FBitem.name} src={this.props.FBitem.full_picture} />
                            </div>
                            :
                            ""
                        }
                    </div>
                    
                </div>
            );

        }

        else if (this.props.FBitem.type === "video"){
            
            return(
                <div className="fb__post_body">
                    {//if the post has commentary from the poster
                        this.props.FBitem.message ? 
                        <div className="fb__post_message">{this.props.FBitem.message}</div> 
                        : 
                        "" 
                    }
                    {
                        this.props.FBitem.full_picture ?
                        <div className="fb__content_box">
                            <a href={this.props.FBitem.link} target="_blank">
                                {this.props.FBitem.description}
                            </a>
                            <br />
                            <img alt={this.props.FBitem.name} src={this.props.FBitem.full_picture} />                     
                        </div>
                        :
                        <a href={this.props.FBitem.link} target="_blank">
                            {this.props.FBitem.description}
                        </a>
                    }
                </div>
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
            <div className="fb__feed_item">
                            
                {this.renderHeader()}

                {this.renderBody()}

                {this.renderFooter()}

            </div>
       );
    }
}

FBfeedItem.propTypes = {
    FBitem: PropTypes.objectOf(PropTypes.any),
    locale: PropTypes.string,
    timeFormat: PropTypes.object,
}

export default FBfeedItem;