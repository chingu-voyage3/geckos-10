import React, { Component } from 'react';
import { reduxForm, Field, Form } from 'redux-form';
import { addCalendarEvent } from '../actions/actions';
import { connect } from "react-redux";



const renderInput = field =>
  <div>
    <input {...field.input} type={field.type} />
    {field.meta.touched &&
      field.meta.error &&
      <span className='error'>field.meta.error}</span>}
  </div>

class AddEvent extends Component {

  render() {

    const { handleSubmit } = this.props;
    return (
      <Form className='loginStyles' onSubmit={handleSubmit(this.props.addCalendarEvent)}>
        <h3>Create A New Event</h3>
        <hr />
        <div className='form-group'>
          <label className='pt-label'>Title
            <Field className='pt-input' name='title' component={renderInput} type='text' />
          </label>
        </div>
        <div className='form-group'>
          <label className='pt-label'>Location
            <Field className='pt-input' name='location' component={renderInput} type='text' />
          </label>
        </div>
        <div>
          <label className='pt-label'>Description
            <Field className='pt-input' name='description' component={renderInput} type='textarea' />
          </label>
        </div>
        <div>
          <label className='pt-label'>Start
          </label>
          <Field className='pt-input' name='startDate' component={renderInput} type='date' />
          <Field className='pt-input' name='startTime' component={renderInput} type='time' />
        </div>
        <div>
          <label className='pt-label'>End
          </label>
          <Field className='pt-input' name='endDate' component={renderInput} type='date' />
          <Field className='pt-input' name='endTime' component={renderInput} type='time' />
        </div>
        <button type='submit' className='pt-button pt-intent-primary'>Submit</button>
      </Form>
    )
  }
}

export default connect(null, { addCalendarEvent })(reduxForm({
  form: 'AddEvent',
})(AddEvent));

