import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

class Footer extends Component {
  render() {
    return (
      <footer className="appFooter">
        {this.props.authenticated
          ? <div className="navList">
            <div className="navItem navItem-1">
              <NavLink to="/todo">
                <i className="fa fa-list-ul fa-2x fa-fw" aria-hidden="true" title="To Do"></i>
              </NavLink>
            </div>
            <div className="navItem navItem-2">
              <NavLink to="/social">
                <i className="fa fa-facebook-official fa-2x fa-fw" aria-hidden="true" title="Social Media Feed"></i>
              </NavLink>
            </div>
            <div className="navItem navItem-3">
              <NavLink to="/calendar">
                <i className="fa fa-calendar fa-2x fa-fw" aria-hidden="true" title="Calendar"></i>
              </NavLink>
            </div>
            <div className="navItem navItem-4">
              <NavLink to="/weather">
                <i className="fa fa-sun-o fa-2x fa-fw" aria-hidden="true" title="Weather"></i>
              </NavLink>
            </div>
          </div>
          : <p>You must sign in to continue!</p>}

      </footer>
    );
  }
}

Footer.propTypes = {
  authenticated: PropTypes.bool
};

export default Footer;
