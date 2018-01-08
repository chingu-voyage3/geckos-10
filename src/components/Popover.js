import React, { Component } from 'react';
import { Button, Intent, Popover, PopoverInteractionKind, Position, Toaster } from '@blueprintjs/core';
// import { removeCalendarEvent } from '../actions/actions';
import firebase from 'firebase';
import PropTypes from "prop-types";

class PopoverModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: '',
    }
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  deleteEvent() {
    let firebaseId = this.props.currentEvent.id;
    firebase.database().ref(`users/events/${firebase.auth().currentUser.uid}/${firebaseId}`).remove();
    this.toaster.show({
      intent: Intent.SUCCESS,
      message: "Successfully deleted event"
    });
  }

  render() {

    if (this.props.isSelected) {
      let currentEvent = this.props.currentEvent;
      return (
        <div className='buttons-inline'>
          <Popover
            className='popover'
            interactionKind={PopoverInteractionKind.CLICK}
            popoverClassName="pt-popover-content-sizing"
            position={Position.RIGHT}
          >
            <Button intent={Intent.PRIMARY}>More</Button>
            <div>
              <h2>{currentEvent.title}</h2>
              <h5>{currentEvent.location}</h5>
              <h5>{currentEvent.description}</h5>
              <p>Start Date: {currentEvent.startDate}</p>
              <p>Start Time: {currentEvent.startTime}</p>
              <p>End Date: {currentEvent.endDate}</p>
              <p>End Time: {currentEvent.endTime}</p>
              <Button onClick={this.deleteEvent} className="remove-button pt-button pt-intent-danger">Remove</Button>
            </div>
          </Popover>
          <Toaster ref={element => {
            this.toaster = element;
          }} />
        </div>
      )
    } else {
      return (
        null
      )
    }
  }
}

PopoverModal.propTypes = {
  isSelected: PropTypes.func,
  currentEvent: PropTypes.object,
};

export default PopoverModal;