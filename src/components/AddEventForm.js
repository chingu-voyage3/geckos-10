import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form';
import { addCalendarEvent } from '../actions/actions';
import { Intent, Toaster } from '@blueprintjs/core';
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import PropTypes from "prop-types";

const required = value => value ? undefined : 'Required'
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)



class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fireRedirect: false,
    }
    this.addEvent = this.addEvent.bind(this);
  }


  addEvent(event) {
    // event.preventDefault();
    firebase
      .database()
      .ref(`users/events/${firebase.auth().currentUser.uid}`)
      .push(event)
    this.setState({ fireRedirect: true });
    this.toaster.show({
      intent: Intent.SUCCESS,
      message: "Successfully created event"
    });
  }



  render() {
    if (!firebase.auth().currentUser) {
      return <Redirect to='/login' />;
    }
    if (this.state.fireRedirect) {
      return (
        <Redirect to='/calendar' />
      )
    }
    const { handleSubmit } = this.props;
    return (
      <div>
        <Form className='loginStyles'
          onSubmit={handleSubmit(this.addEvent)}
        >
          <h3>Create A New Event</h3>
          <hr />
          <div className='form-group'>
            <label className='pt-label'>Title
            <Field className='pt-input' name='title' component={renderField} type='text' validate={[required]} />
            </label>
          </div>
          <div className='form-group'>
            <label className='pt-label'>Location
            <Field className='pt-input' name='location' component={renderField} type='text' validate={[required]} />
            </label>
          </div>
          <div>
            <label className='pt-label'>Description
            <Field className='pt-input' name='description' component={renderField} type='textarea' validate={[required]} />
            </label>
          </div>
          <div>
            <label className='pt-label'>Start
          </label>
            <Field className='pt-input' name='startDate' component={renderField} type='date' validate={[required]} />
            <Field className='pt-input' name='startTime' component={renderField} type='time' validate={[required]} />
          </div>
          <div>
            <label className='pt-label'>End
          </label>
            <Field className='pt-input' name='endDate' component={renderField} type='date' validate={[required]} />
            <Field className='pt-input' name='endTime' component={renderField} type='time' validate={[required]} />
          </div>
          <button type='submit' className='pt-button pt-intent-primary'>Submit</button>
        </Form>
        <Toaster
          ref={element => {
            this.toaster = element;
          }} />
        <Link to='/calendar'>Go back!</Link>
      </div>
    )
  }

}

AddEvent.propTypes = {
  handleSubmit: PropTypes.func,
};

renderField.propTypes = {
  input: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.objectOf({
    touched: PropTypes.string,
    error: PropTypes.string,
    warning: PropTypes.sring,
  }),
};

export default connect(null, { addCalendarEvent })(reduxForm({
  form: 'AddEvent',
})(AddEvent));

