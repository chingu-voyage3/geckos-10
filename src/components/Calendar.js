import React, { Component } from 'react';
import moment from 'moment'
import BigCalendar from 'react-big-calendar';
import { Link, Redirect } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { dbRefEvents } from '../store/store';
// import calendarEvents from '../data/calendarEventsSampleData';
import { firebase } from '@firebase/app';

BigCalendar.momentLocalizer(moment);


class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
    };
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
  }

  handleSelectEvent(event) {
    console.log('it works!');
    console.log(event);
  }

  componentDidMount() {
    if (firebase.auth().currentUser) {
      let userEventsRef = firebase
        .database()
        .ref(`users/events/${firebase.auth().currentUser.uid}`);


      const snapshotToArray = snapshot => {
        let eventsArr = [];
        snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          console.log(item);
          let modEvent = {
            title: item.title,
            description: item.description,
            location: item.location,
            start: new Date(`${item.startDate}  ${item.startTime}`),
            end: new Date(`${item.endDate}  ${item.endTime}`),
            id: `_${Math.random().toString(36).substr(2, 9)}`,
          }
          console.log(modEvent);
          eventsArr.push(modEvent);
        });
        this.setState({
          events: eventsArr,
        })
        return eventsArr;
      }

      userEventsRef.on('value', snapshot => {
        console.log(snapshotToArray(snapshot));
      });
    }
  }

  render() {
    if (!firebase.auth().currentUser) {
      return <Redirect to='/login' />;
    }
    let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
    return (
      <div>
        <div>

          <BigCalendar style={{ height: '420px', marginTop: '10vh', marginRight: '5vh', marginLeft: '5vh' }} events={this.state.events} views={allViews} selectable={true} onSelectEvent={(event) => this.handleSelectEvent(event)} />

          <Link to='/calendar/new'>Add Event</Link>
        </div >
      </div>
    )
  }
}


export default Calendar;