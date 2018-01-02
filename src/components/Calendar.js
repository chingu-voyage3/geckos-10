import React, { Component } from 'react';
import moment from 'moment'
import BigCalendar from 'react-big-calendar';
import { Link } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { dbRefEvents } from '../store/store';

BigCalendar.momentLocalizer(moment);


class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
    };
  }
  componentDidMount() {

    const snapshotToArray = snapshot => {
      let eventsArr = [];
      snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        eventsArr.push(item);
      });
      this.setState({
        events: eventsArr,
      })
      return eventsArr;
    }

    let dbEvents = dbRefEvents.on('value', snapshot => {
      console.log(snapshotToArray(snapshot));

    });

  }
  render() {
    let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
    return (
      <div>
        <div>

          <BigCalendar style={{ height: '420px', marginTop: '10vh', marginRight: '5vh', marginLeft: '5vh' }} events={this.state.events} views={allViews} selectable={true} />

          <Link to='/calendar/new'>Add Event</Link>
          <button>Update Event</button>
          <button>Delete Event</button>
        </div >
      </div>
    )
  }
}

export default Calendar;