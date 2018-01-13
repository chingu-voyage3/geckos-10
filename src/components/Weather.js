import React, { Component } from 'react';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.getLocation = this.getLocation.bind(this);
        this.getWeather = this.getWeather.bind(this);
        // this.handleWeather = this.handleWeather.bind(this);        
    }
    
    getWeather(lat, long) {
        let request = new XMLHttpRequest();
        request.open("GET", `https://api.darksky.net/forecast/57543c2d90d2e41f9cc119f5b105cb2c/${lat},${long}?exclude=minutely,hourly,alerts,flags&units=auto`, true);
        request.send();
    }

    /* handleWeather(serverResponse) {
        let weatherData = serverResponse;

        console.log(weatherData);
    } */

    getLocation() {
        if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                this.getWeather(position.coords.latitude, position.coords.longitude);
            });
        }
        else {
            console.log("geolocation not available");
        }             
    }
    
    render() {
        return (
            <div>
                {console.log(this.getLocation())}
            </div>
        )
    }

}

export default Weather;
