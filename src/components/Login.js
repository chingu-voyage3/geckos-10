import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Toaster, Intent } from '@blueprintjs/core';

import { app, googleProvider, facebookProvider } from '../store/store';

class Login extends Component {
  constructor(props) {
    super();
    this.authWithGoogle = this.authWithGoogle.bind(this);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.authWithFacebook = this.authWithFacebook.bind(this);
    this.state = {
      redirect: false,
    }
  }

  authWithGoogle() {
    app.auth().signInWithPopup(googleProvider).then((result, error) => {
      if (error) {
        this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Google" })
        console.log(error);
      } else {
        // const token = result.credential.accessToken;
        // let user = result.user;
        // console.log(user);


        this.setState({
          redirect: true,
        })
      }
    });
  }

  authWithFacebook() {
    //can't log in with facebook, when already logged into different provider with same email.
    //change error catching method to use app.auth().fetchProvidersForEmail
    app.auth().signInWithPopup(facebookProvider).then((result, error) => {
      if (error) {
        this.toaster.show({ intent: Intent.DANGER, message: error.message })
        console.log(error);
      }
      else {
        this.setState({
          redirect: true,
        })
      }
    });
  }


  authWithEmailPassword(event) {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    app.auth().fetchProvidersForEmail(email).then((provider) => {
      if (provider.length === 0) {
        //create user
        return app.auth().createUserWithEmailAndPassword(email, password)
      } else if (provider.indexOf("password") === -1) {
        this.loginForm.reset();
        //they used google
        this.toaster.show({ intent: Intent.WARNING, message: "Try alternative login." })
      } else {
        //sign user in
        return app.auth().signInWithEmailAndPassword(email, password);
      }
    }).then((user) => {
      if (user && user.email) {
        this.loginForm.reset();
        this.setState({ redirect: true });
      }
    })
      .catch((error) => {
        this.toaster.show({ intent: Intent.DANGER, message: error.message })
      })
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }
    //Toaster, part of blueprint, provides visual intent styles, and notices
    return (
      <div className='loginStyles' >
        <Toaster ref={(element) => { this.toaster = element }} />
        < button 
          className="pt-button pt-intent-primary" 
          onClick={() => (this.authWithGoogle())}>   
          Log In with Google
        </button >
        < button 
          className="pt-button pt-intent-primary" 
          onClick={() => (this.authWithFacebook())}> 
          Log In with Facebook
        </button >
        <hr className="login-form-hr" />
        <form 
          onSubmit={(event) => { this.authWithEmailPassword(event) }} 
          ref={(form) => { this.loginForm = form }}>
          <div className="login-form pt-callout pt-icon-info-sign">
            <h5>Note</h5>
            If you don't have an account already, this form will create your account.
          </div>
          <label className='pt-label'>
            Email
            <input 
              className="pt-input" 
              name="email" 
              type="email" 
              ref={(input) => { this.emailInput = input }} 
              placeholder="Email" />
          </label>
          <label className='pt-label'>
            Password
            <input 
              className="pt-input" 
              name="password" 
              type="password" 
              ref={(input) => { this.passwordInput = input }} 
              placeholder="Password" />
          </label>
          <input 
            type="submit" 
            className="pt-button pt-intent-primary" 
            value='Log In/Register' />
        </form>
      </div >
    )
  }
}

export default Login;