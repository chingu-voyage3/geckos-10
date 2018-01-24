import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
//import ForecastedWeather from "./ForecastedWeather";

class Weather extends Component {
  constructor(props) {
    super(props)
    this.getGeolocation = this.getGeolocation.bind(this);
    this.getCurrentWeather = this.getCurrentWeather.bind(this);
    this.getForecastedWeather = this.getForecastedWeather.bind(this);

    this.state = {
      currentTemp: "",
      currentMinTemp: "",
      currentMaxTemp: "",
      currentWeatherDescription: "",
      currentWeatherIcon: "",
      cityName: ""
    };
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
        //this.getForecastedWeather(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.error("Geolocation not available");
    }
  }

  getCurrentWeather(lat, long) { 
    let self = this;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=imperial&appid=8a97501f583dce1be2d56e0078c390f0`
      )
      .then(function(response) {
        console.log(response.data);
        self.setState({
          currentTemp: self.state.currentTemp + response.data.main.temp,
          currentMinTemp: self.state.currentMinTemp + response.data.main.temp_min,
          currentMaxTemp: self.state.currentMaxTemp + response.data.main.temp_max,
          currentWeatherDescription: self.state.currentWeatherDescription + response.data.weather[0].description,
          currentWeatherIcon: self.state.currentWeatherIcon + response.data.weather[0].icon,
          cityName: self.state.cityName + response.data.name
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  getForecastedWeather(lat, long) {
    /*let self = this;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&appid=8a97501f583dce1be2d56e0078c390f0`
      )
      .then(function(response) {
        console.log(response.data);
        self.setState({
          futureMaxTemp: self.state.futureMaxTemp + response.data.main.temp_max
        });
      })
      .catch(function(error) {
        console.error(error);
      });*/
  }

  render() {
    if (!this.props.authenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="weatherTab">
        <CurrentWeather {...this.state} />
        {/* <ForecastedWeather /> */}
      </div>
    )
  }
}

export default Weather;
