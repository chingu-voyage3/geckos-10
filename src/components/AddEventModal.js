import React, { Component } from 'react';
import { Button, Intent, Popover, PopoverInteractionKind, Position, Toaster } from '@blueprintjs/core';
import firebase from 'firebase';
import PropTypes from "prop-types";

class AddEventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEvent: {},
    }
    this.addEvent = this.addEvent.bind(this);
    this.changeText = this.changeText.bind(this);
  }
  addEvent(event) {
    const popover = document.querySelector('.popover');
    console.log(event);
    console.log(this.state.newEvent);
    event.preventDefault();
    firebase
      .database()
      .ref(`users/events/${firebase.auth().currentUser.uid}`)
      .push(this.state.newEvent)
    this.toaster.show({
      intent: Intent.SUCCESS,
      message: "Successfully created event"
    });
    popover.classList.remove('pt-popover-open');
  }

  changeText(event) {
    let state = this.state.newEvent;
    if (event.target.name === 'title') {
      state.title = event.target.value;
    } else if (event.target.name === 'description') {
      state.description = event.target.value
    } else if (event.target.name === 'location') {
      state.location = event.target.value
    } else if (event.target.name === 'startTime') {
      state.startTime = event.target.value
    } else if (event.target.name === 'startDate') {
      state.startDate = event.target.value
    } else if (event.target.name === 'endTime') {
      state.endTime = event.target.value
    } else if (event.target.name === 'endDate') {
      state.endDate = event.target.value
    }
    this.setState({
      newEvent: state,
    })
  }


  render() {
    return (
      <div className='buttons-inline'>
        <Popover
          className='popover'
          interactionKind={PopoverInteractionKind.CLICK}
          popoverClassName="pt-popover-content-sizing"
          position={Position.RIGHT}
          id='addButton'
        >
          <Button intent={Intent.PRIMARY}>Add</Button>
          <form className='loginStyles' onSubmit={this.addEvent}>
            <h3>Add Event</h3>
            <hr />
            <div className='form-group'>
              <label className='pt-label'>Title
            <input onChange={this.changeText} className='pt-input title' name='title' type='text' required />
              </label>
            </div>
            <div className='form-group'>
              <label className='pt-label'>Location
            <input onChange={this.changeText} className='pt-input' name='location' type='text' />
              </label>
            </div>
            <div>
              <label className='pt-label'>Description
            <input onChange={this.changeText} className='pt-input' name='description' type='text' />
              </label>
            </div>
            <div>
              <label className='pt-label'>Start
          </label>
              <input onChange={this.changeText} className='pt-input' name='startDate' type='date' required />
              <input onChange={this.changeText} className='pt-input' name='startTime' type='time' required />
            </div>
            <div>
              <label className='pt-label'>End
          </label>
              <input onChange={this.changeText} className='pt-input' name='endDate' type='date' required />
              <input onChange={this.changeText} className='pt-input' name='endTime' type='time' required />
            </div>
            <button type='submit' className='pt-button pt-intent-primary'>Submit</button>
          </form>
        </Popover>
        <Toaster ref={element => {
          this.toaster = element;
        }} />
      </div >
    )
  }
}


AddEventModal.propTypes = {
  isSelected: PropTypes.bool,
  currentEvent: PropTypes.object,
};

export default AddEventModal;