import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (

      <footer className="appFooter">
        {this.props.authenticated
          ?
          <div className='navList'>
            <div className="navItem navItem-1"><NavLink to="/todo">Todos</NavLink></div>
            <div className="navItem navItem-2"><NavLink to="/social">Feed</NavLink></div>
            <div className="navItem navItem-3"><NavLink to="/calendar">Calendar</NavLink></div>
            <div className="navItem navItem-4"><NavLink to="/weather">Weather</NavLink></div>
          </div>
          :
          <p>You must sign in to continue!</p>
        }

      </footer>
    )
  }

}

export default Footer;