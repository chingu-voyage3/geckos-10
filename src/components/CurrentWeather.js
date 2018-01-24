import React, { Component } from 'react';

class CurrentWeather extends Component {
  render() {
    return (
      <div className="currentWeatherDiv">
        <div className="iconAndTemp">
          <img src={"http://openweathermap.org/img/w/" + this.props.currentWeatherIcon + ".png"} />
          <p>{this.props.currentTemp}°F</p>
        </div>
        <div className="descriptionAndMinMax">
          <p>{this.props.currentWeatherDescription}</p>
          <p>Low: {this.props.currentMinTemp}°F</p>
          <p>High: {this.props.currentMaxTemp}°F</p>
        </div>
        <p>{this.props.cityName}</p>
      </div>
    );
  }
}

export default CurrentWeather;