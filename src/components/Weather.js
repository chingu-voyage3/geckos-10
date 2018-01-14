import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Weather extends Component {
  constructor(props) {
    super(props)
    this.getGeolocation = this.getGeolocation.bind(this);
    this.getCurrentWeather = this.getCurrentWeather.bind(this);
    this.getForecastedWeather = this.getForecastedWeather.bind(this);

    /* this.state = {
      currentWeather: ""
    } */
  }

  componentDidMount() {
    if (this.props.authenticated) {
      this.getGeolocation();
    }
  }

  getGeolocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.getCurrentWeather(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.error("Geolocation not available");
    }
  }

  getCurrentWeather = (lat, long) => { 
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&cnt=5&units=imperial&appid=8a97501f583dce1be2d56e0078c390f0`
        //`https://api.darksky.net/forecast/57543c2d90d2e41f9cc119f5b105cb2c/${lat},${long}?exclude=minutely,hourly,alerts,flags&units=auto`
      )
      .then(function(response) {
        console.log(response.data);
        /* this.setState({
          currentWeather: response.data
        }) */
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  getForecastedWeather() {
    // TODO
  }

  render() {
    if (!this.props.authenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="weatherTab">
        { /* <p>{this.state.currentWeather}</p> */}
      </div>
    )
  }
}

export default Weather;
