import React, { Component } from 'react';

class CurrentWeather extends Component {
  render() {
    return (
      <div className="currentWeatherDiv">
        <div className="iconTemp">
          <img className="icon" src={"http://openweathermap.org/img/w/" + this.props.currentWeatherIcon + ".png"} />
          <h2 className="currentTemp">{this.props.currentTemp}°F</h2>
        </div>
        {/*<p className="description">{this.props.currentWeatherDescription}</p>
        <p>Low: {this.props.currentMinTemp}°F</p>
        <p>High: {this.props.currentMaxTemp}°F</p>
    <p className="city">{this.props.cityName}</p>*/}
      </div>
    );
  }
}

export default CurrentWeather;