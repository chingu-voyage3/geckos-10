//TODO: Import reducers here
import { combineReducers } from "redux";
import { firebaseStateReducer } from "react-redux-firebase";
import { reducer as formReducer } from 'redux-form'
import {
} from '../actions/actions'

import todos from "./todos";
import calendarEventsReducer from "./calendarEvents";

export const rootReducer = combineReducers({
  //TODO: Add reducers here
  form: formReducer,
  todos: todos,
  calendarEvents: calendarEventsReducer,
  firebase: firebaseStateReducer
});
