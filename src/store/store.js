import { createStore, compose } from "redux";
import { reactReduxFirebase } from "react-redux-firebase";
import firebase from "firebase";
import { rootReducer } from "../reducers/index";

<<<<<<< HEAD
import * as Redux from 'redux'
import { compose, createStore } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'
import { rootReducer } from '../reducers/index';
import thunk from 'redux-thunk';
=======
import todos from "../data/todoSampleData";
>>>>>>> 04890983bf8b6857d32a1b3915a4bf1fc3331501

const firebaseConfig = {
  apiKey: "AIzaSyBJlE_NH1WuT-7lrGNpoE-3snfzV_BCaIU",
  authDomain: "geckos-10-tab.firebaseapp.com",
  databaseURL: "https://geckos-10-tab.firebaseio.com",
  projectId: "geckos-10-tab",
  storageBucket: "geckos-10-tab.appspot.com",
  messagingSenderId: "893868351541"
};

// react-redux-firebase config
const config = {
  userProfile: "users",
  enableLogging: false
};

// initialize firebase instance
const app = firebase.initializeApp(firebaseConfig)


// Add reduxReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, config), // firebase instance as first argument
)(createStore)

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/calendar')
const firebaseRef = firebase.database().ref();

// Create store with reducers and initial state .
<<<<<<< HEAD
export const configure = (initialState = {}) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

  const enhancer = composeEnhancers(Redux.applyMiddleware(thunk));

  const store = createStoreWithFirebase(rootReducer, initialState, enhancer);

  return store;
};

export { app, googleProvider, firebaseRef }
=======
const initialState = {
  todos: { nextTodoID: 100, lists: todos }
}
const store = createStoreWithFirebase(rootReducer, initialState)

export { app, googleProvider, store, firebaseRef }
>>>>>>> 04890983bf8b6857d32a1b3915a4bf1fc3331501
