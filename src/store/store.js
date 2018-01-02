import { createStore, compose, applyMiddleware } from "redux";
import { reactReduxFirebase } from "react-redux-firebase";
import firebase from "firebase";
import { rootReducer } from "../reducers/index";
import thunk from 'redux-thunk';


import todos from "../data/todoSampleData";

export const firebaseConfig = {
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
const dbRefUsers = firebaseRef.child(`users`);
const dbRefEvents = dbRefUsers.child('events');



// Create store with reducers and initial state .
const initialState = {
  todos: { nextTodoID: 100, lists: todos },
  // calendarEvents: dbRefEvents,
}
const store = createStoreWithFirebase(rootReducer, initialState, applyMiddleware(thunk));

export { app, googleProvider, store, firebaseRef, dbRefEvents }
