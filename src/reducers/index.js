import { combineReducers } from "redux";
import { firebaseStateReducer } from "react-redux-firebase";

//TODO: Import reducers here
import {
} from '../actions/actions'

import todos from "./todos";

export const rootReducer = combineReducers({
  //TODO: Add reducers here
  todos: todos,
  firebase: firebaseStateReducer
});
