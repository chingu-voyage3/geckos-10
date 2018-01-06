import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class Header extends Component {
  render() {
    let name = this.props.name;
    return (
      <header className='appHeader'>
        {this.props.authenticated
          ?
          <div>
            <Link to="/logout" className='pt-button pt-minimal pt-icon-log-out' aria-label="Logout"></Link>
            <p>Logged in as {name}</p>
          </div>
          : <Link to="/login" className='pt-button pt-intent-primary'>Register or Log In</Link>
        }
      </header>
    )
  }
}


export default Header;