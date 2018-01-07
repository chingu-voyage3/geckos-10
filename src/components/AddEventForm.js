import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form';
import { addCalendarEvent } from '../actions/actions';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import firebase from 'firebase';

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



  componentDidMount() {
    console.log(firebase.auth().currentUser.uid);
  }


  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <Form className='loginStyles'
          onSubmit={() => handleSubmit(this.props.addCalendarEvent)}
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
            <Field className='pt-input' name='location' component={renderField} type='text' />
            </label>
          </div>
          <div>
            <label className='pt-label'>Description
            <Field className='pt-input' name='description' component={renderField} type='textarea' />
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
        <Link to='/calendar'>Go back!</Link>
      </div>
    )
  }

}

export default connect(null, { addCalendarEvent })(reduxForm({
  form: 'AddEvent',
})(AddEvent));

