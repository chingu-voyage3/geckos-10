import * as Redux from 'redux';
import thunk from 'redux-thunk';
import { reducer } from '../reducers';

export const configure = (initialState = {}) => {
  // Set up Redux devtools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

  const enhancer = composeEnhancers(Redux.applyMiddleware(thunk));

  const store = Redux.createStore(reducer, initialState, enhancer);

  return store;
};
