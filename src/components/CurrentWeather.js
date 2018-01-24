import React, { Component } from 'react';

class CurrentWeather extends Component {
  render() {
    return (
      <div className="currentWeatherDiv">
        <div className="iconTemp">
          <img className="icon" src={"http://openweathermap.org/img/w/" + this.props.currentWeatherIcon + ".png"} />
          <h1 className="currentTemp">{this.props.currentTemp}°F</h1>
        </div>
        <div className="descriptionMinMax">
          <h3 className="description">{this.props.currentWeatherDescription}</h3>
          <div className="minMax">
            <h3>Low: {this.props.currentMinTemp}°F</h3>
            <h3>High: {this.props.currentMaxTemp}°F</h3>
          </div>
        </div>
        <h2 className="city">{this.props.cityName}</h2>
      </div>
    );
  }
}

export default CurrentWeather;