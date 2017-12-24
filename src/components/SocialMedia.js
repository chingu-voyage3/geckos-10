import React, { Component } from 'react';

//use oauth to ask for user id
//https://hackernoon.com/graphapi-get-query-fetch-public-facebook-page-feed-3-step-tutorial-example-access-token-auth-post-d7403c717fbf

class SocialMedia extends Component {

    componentWillMount() {
        //**When clicking back and forth between bottom menu items, like button stops appearing

        //The following code will give the basic version of the SDK where the options are set to their most common defaults. 
        //You should insert it directly after the opening <body> tag on each page you want to load it:
        //https://gist.github.com/urbanvikingr/119483dfd01b4d88055d51678a84a048

        //initialize the Javascript SDK
        window.fbAsyncInit = function() {
            //need to add window. prefix to FB since it's not in index.html or else FB is undefined
            window.FB.init({
            appId      : '1186050748193429',
            //With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML. If you're not using social plugins on the page, setting xfbml to false will improve page load times.
            xfbml      : true,
            version    : 'v2.11'
            });
            window.FB.AppEvents.logPageView();
        };

        
        //Load SDK asynchronously
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }




    render (){
        return(
            <div style={{margin:"20px 0 0 0",}}>
                <div
                    class="fb-like"
                    data-share="true"
                    data-width="450"
                    data-show-faces="true">
                </div>
                <div>testing social media</div>
            </div>
        );
    }
}

export default SocialMedia;