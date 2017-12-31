import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Header extends Component {
  render() {
    let name = this.props.name;
    return (
      <header className="appHeader">
        {this.props.authenticated
          ? <div>
            <Link
              to="/logout"
              className="pt-button pt-minimal pt-icon-log-out"
              aria-label="Logout"
            />
            <p>Logged in as {name}</p>
          </div>
          : <Link to="/login" className="pt-button pt-intent-primary">
            Register or Log In
            </Link>}
      </header>
    );
  }
}

Header.propTypes = {
  authenticated: PropTypes.bool,
  name: PropTypes.string
};

export default Header;
