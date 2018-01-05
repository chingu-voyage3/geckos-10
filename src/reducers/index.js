import { combineReducers } from "redux";
import { firebaseStateReducer } from "react-redux-firebase";

//TODO: Import reducers here
import todoAppReducer from "./todosReducer";

export const rootReducer = combineReducers({
  //TODO: Add reducers here
  todos: todoAppReducer,
  firebase: firebaseStateReducer
});
