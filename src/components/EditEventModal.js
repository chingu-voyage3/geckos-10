import React, { Component } from 'react';
import { Button, Intent, Popover, PopoverInteractionKind, Position, Toaster } from '@blueprintjs/core';
import firebase from 'firebase';
import PropTypes from "prop-types";

class EditEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEvent: {
        title: this.props.currentEvent.title,
        location: this.props.currentEvent.location,
        description: this.props.currentEvent.description,
        startDate: this.props.currentEvent.startDate,
        startTime: this.props.currentEvent.startTime,
        endDate: this.props.currentEvent.endDate,
        endTime: this.props.currentEvent.endTime,
        id: this.props.currentEvent.id,
      },
      fireRedirect: false,
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.changeText = this.changeText.bind(this);
  }

  changeText(event) {
    let state = this.props.currentEvent;
    if (event.target.name === 'title') {
      if (event.target.value) {
        state.title = event.target.value;
      } else {
        state.title = ''
      }
    } else if (event.target.name === 'description') {
      if (event.target.value) {
        state.description = event.target.value
      } else {
        state.description = ''
      }
    } else if (event.target.name === 'location') {
      if (event.target.value) {
        state.location = event.target.value
      } else {
        state.location = ''
      }
    } else if (event.target.name === 'startTime') {
      if (event.target.value) {
        state.startTime = event.target.value
      } else {
        state.startTime = ''
      }
    } else if (event.target.name === 'startDate') {
      if (event.target.value) {
        state.startDate = event.target.value
      } else {
        state.startDate = ''
      }

    } else if (event.target.name === 'endTime') {
      if (event.target.value) {
        state.endTime = event.target.value
      } else {
        state.endTime = ''
      }
    } else if (event.target.name === 'endDate') {
      if (event.target.value) {
        state.endDate = ''
      }
    }
    this.setState({
      currentEvent: state,
    })
  }

  onSubmit(event) {
    event.preventDefault();
    firebase
      .database()
      .ref(`users/events/${firebase.auth().currentUser.uid}/${this.props.currentEvent.id}`)
      .update(this.state.currentEvent);
    this.setState({ fireRedirect: true });
    this.toaster.show({
      intent: Intent.SUCCESS,
      message: "Successfully edited event"
    });
  }

  render() {
    if (this.props.isSelected) {
      return (
        <div className='buttons-inline'>

          <Popover
            className='popover popover-edit'
            interactionKind={PopoverInteractionKind.CLICK}
            popoverClassName="pt-popover-content-sizing"
            position={Position.RIGHT}
          >
            <Button intent={Intent.PRIMARY}>Edit</Button>
            <form className='loginStyles' onSubmit={this.onSubmit}>
              <h3>Edit Event</h3>
              <hr />
              <div className='form-group'>
                <label className='pt-label'>Title
            <input onChange={this.changeText} className='pt-input title' name='title' type='text' value={this.props.currentEvent.title} required />
                </label>
              </div>
              <div className='form-group'>
                <label className='pt-label'>Location
            <input onChange={this.changeText} className='pt-input' name='location' type='text' value={this.props.currentEvent.location} />
                </label>
              </div>
              <div>
                <label className='pt-label'>Description
            <input onChange={this.changeText} className='pt-input' name='description' type='text' value={this.props.currentEvent.description} />
                </label>
              </div>
              <div>
                <label className='pt-label'>Start
          </label>
                <input onChange={this.changeText} className='pt-input' name='startDate' type='date' value={this.props.currentEvent.startDate} required />
                <input onChange={this.changeText} className='pt-input' name='startTime' type='time' value={this.props.currentEvent.startTime} required />
              </div>
              <div>
                <label className='pt-label'>End
          </label>
                <input onChange={this.changeText} className='pt-input' name='endDate' type='date' value={this.props.currentEvent.endDate} required />
                <input onChange={this.changeText} className='pt-input' name='endTime' type='time' value={this.props.currentEvent.endTime} required />
              </div>
              <button type='submit' className='pt-button pt-intent-primary'>Submit</button>
            </form>
          </Popover>
          <Toaster
            ref={element => {
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

EditEventModal.propTypes = {
  currentEvent: PropTypes.object,
  isSelected: PropTypes.bool,

};

export default EditEventModal;