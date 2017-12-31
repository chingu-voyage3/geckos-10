import { combineReducers } from "redux";
import { firebaseStateReducer } from "react-redux-firebase";

//TODO: Import reducers here
<<<<<<< HEAD
import {
} from '../actions/actions'

=======
import todos from "./todos";
>>>>>>> 04890983bf8b6857d32a1b3915a4bf1fc3331501

export const rootReducer = combineReducers({
  //TODO: Add reducers here
  todos: todos,
  firebase: firebaseStateReducer
});
