import React, { Component } from 'react';
import moment from 'moment'
import BigCalendar from 'react-big-calendar';
import { Link, Redirect } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { firebase } from '@firebase/app';
import PopoverModal from './Popover';
import EditEventModal from './EditEventModal';
import PropTypes from "prop-types";

BigCalendar.momentLocalizer(moment);



class Calendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      isSelected: false,
      currentEvent: {},
      redirectToNewPage: false,
      currentId: '',
    };
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
  }


  handleSelectEvent(event) {
    // console.log('it works!');
    let currentEvent = event;
    this.setState({ currentEvent: currentEvent, isSelected: true });
    // console.log(this.state.currentEvent);

  }

  componentDidMount() {
    if (firebase.auth().currentUser) {
      let userEventsRef = firebase
        .database()
        .ref(`users/events/${firebase.auth().currentUser.uid}/`);
      const snapshotToArray = snapshot => {
        let eventsArr = [];
        snapshot.forEach(childSnapshot => {
          // console.log(snapshot.val());
          let key = childSnapshot.key;
          // console.log(key);
          let item = childSnapshot.val();
          // console.log(item);
          let modEvent = {
            id: key,
            title: item.title,
            description: item.description,
            location: item.location,
            start: new Date(`${item.startDate}  ${item.startTime}`),
            end: new Date(`${item.endDate}  ${item.endTime}`),
            startDate: item.startDate,
            startTime: item.startTime,
            endDate: item.endDate,
            endTime: item.endTime,
          }
          // console.log(modEvent);
          eventsArr.push(modEvent);
        });
        this.setState({
          events: eventsArr,
        })
        return eventsArr;
      }

      userEventsRef.on('value', snapshot => {
        snapshotToArray(snapshot);
      });
    }
  }

  render() {
    if (!firebase.auth().currentUser) {
      return <Redirect to='/login' />;
    }
    let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

    return (
      <div className='calendarComponent'>
        <div>

          <BigCalendar className='bigCalendar'
            events={this.state.events}
            views={allViews} selectable={true}
            onSelectEvent={this.handleSelectEvent} />
          <section className='calendar-buttons'>
            <button type='button' className='add-event pt-button pt-intent-primary'><Link to={{ pathname: '/calendar/new' }}>Add Event</Link></button>
            <PopoverModal {...this.state } />
            <EditEventModal {...this.state } />
          </section>
        </div >
      </div>
    )
  }
}

Calendar.propTypes = {
  isSelected: PropTypes.func,
  currentEvent: PropTypes.object,
};


export default Calendar;