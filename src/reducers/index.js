import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase'
//TODO: Import reducers here

export const rootReducer = combineReducers({
  //TODO: Add reducers here
  firebase: firebaseStateReducer,
});
