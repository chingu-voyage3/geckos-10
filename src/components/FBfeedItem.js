import React, { Component } from 'react';

class FBfeedItem extends Component {
    render () {
        var postDate = new Date(this.props.FBitem.created_time);

        return(
            <div className="FBfeedItem">
                {//If the story exists
                    this.props.FBitem.story ?
                    <div className="postStory">{this.props.FBitem.story}</div>
                    :
                    ""
                }
                
                <div className="postDate">
                    <a href={this.props.FBitem.permalink_url} target="_blank">
                        {postDate.toLocaleDateString(this.props.locale,this.props.timeFormat)}
                    </a>
                </div>
                {//if the post has commentary from the poster
                    this.props.FBitem.message ? 
                    <div className="postMessage">{this.props.FBitem.message}</div> 
                    : 
                    "" 
                }
                {//if the link has a name
                    this.props.FBitem.name ?
                    <div>
                        <a href={this.props.FBitem.link} target="_blank">
                            {this.props.FBitem.name}
                        </a>
                    </div>
                    :
                    ""
                }
                {
                    this.props.FBitem.picture ?
                    <img src={this.props.FBitem.picture}/>
                    :
                    ""
                }
            </div>
        );
    }
}

export default FBfeedItem;