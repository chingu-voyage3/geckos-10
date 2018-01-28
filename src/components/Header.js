import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Header extends Component {
  render() {
    let name = this.props.name;
    return (
      <header className="appHeader">
        {this.props.authenticated
          ? 
          <div>
            <Link
              to="/logout"
              className="pt-icon-log-out"
              aria-label="Logout"
            />Logged in as {name}
          </div> 
            : 
          (//make sure login button doesn't show on login screen
            window.location.pathname==="/geckos-10/login" ? 
            ""
            :
            <Link to="/login" className="pt-button pt-intent-primary">
              Register or Log In
            </Link>
          )}
      </header>
    );
  }
}

Header.propTypes = {
  authenticated: PropTypes.bool,
  name: PropTypes.string
};

export default withRouter(Header);
