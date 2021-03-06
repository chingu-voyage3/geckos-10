//TODO: Import reducers here
import { combineReducers } from "redux";
import { firebaseStateReducer } from "react-redux-firebase";
import { reducer as formReducer } from 'redux-form'
import {
} from '../actions/actions'

import todoAppReducer from "./todosReducer";

export const rootReducer = combineReducers({
  //TODO: Add reducers here
  todos: todoAppReducer,
  form: formReducer,
  firebase: firebaseStateReducer,
});
