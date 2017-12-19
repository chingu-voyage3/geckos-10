
import { createStore, compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'
import { rootReducer } from '../reducers/index';

const firebaseConfig = {
  apiKey: "AIzaSyA6smUss1Pst2Asvk1idmVOTBArTnv4GiM",
  authDomain: "geckos-10-tab.firebaseapp.com",
  databaseURL: "https://geckos-10-tab.firebaseio.com",
  projectId: "geckos-10-tab",
  storageBucket: "",
  messagingSenderId: "893868351541"
}

// react-redux-firebase config
const config = {
  userProfile: 'users',
  enableLogging: false,
}

// initialize firebase instance
firebase.initializeApp(config)


// Add reduxReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, config), // firebase instance as first argument
)(createStore)


// Create store with reducers and initial state .
const initialState = {}
export const store = createStoreWithFirebase(rootReducer, initialState)