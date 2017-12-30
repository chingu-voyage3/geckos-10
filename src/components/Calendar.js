import React, { Component } from 'react';
import moment from 'moment'
import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from '../events';
BigCalendar.momentLocalizer(moment);


class Calendar extends Component {
 

  render() {
    let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
    return (
      <div>
        <div>

          <BigCalendar style={{ height: '420px', marginTop: '10vh', marginRight: '5vh', marginLeft: '5vh' }} events={events} views={allViews}/>
          
          <button>Add Event</button>
          <button>Update Event</button>
          <button>Delete Event</button>
        </div >
      </div>
    )
  }
}

export default Calendar;