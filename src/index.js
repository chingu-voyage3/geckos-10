import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configure } from "./store/store";
import "./styles/styles.css";
import '@blueprintjs/core/dist/blueprint.css';
// import * as actions from './actions/actions';

import App from "./App";

const store = configure();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
