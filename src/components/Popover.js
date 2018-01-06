import React, { Component } from 'react';
import { Button, Intent, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import { removeCalendarEvent } from '../actions/actions';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';

class PopoverModal extends Component {
  constructor(props) {
    super(props);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  deleteEvent(event) {
    console.log('Hi from delete event');
    let firebaseId = this.props.currentEvent.id;
    console.log(firebaseId);
    firebase.database().ref(`users/events/${firebase.auth().currentUser.uid}/${firebaseId}`).remove();
    <Redirect to='/calendar' />;
  }

  render() {
    if (this.props.isSelected) {

      return (

        <Popover
          className='popover'
          interactionKind={PopoverInteractionKind.CLICK}
          popoverClassName="pt-popover-content-sizing"
          position={Position.RIGHT}
        >
          <Button intent={Intent.PRIMARY}>Information</Button>
          <div>
            <h2>{this.props.currentEvent.title}</h2>
            <h5>{this.props.currentEvent.location}</h5>
            <h5>{this.props.currentEvent.description}</h5>
            <p>Start Date: {this.props.currentEvent.startDate}</p>
            <p>Start Time: {this.props.currentEvent.startTime}</p>
            <p>End Date: {this.props.currentEvent.endDate}</p>
            <p>End Time: {this.props.currentEvent.endTime}</p>
            <Button className="pt-button pt-intent-success">Edit</Button>
            <Button onClick={this.deleteEvent} className="remove-button pt-button pt-intent-danger">Remove</Button>
          </div>
        </Popover>
      )
    } else {
      return (
        null
      )
    }
  }
}

export default PopoverModal;