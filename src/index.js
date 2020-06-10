import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import configureStore from "./store/configureStore";
import routes from "./routes";
import * as types from "./actions/action_types";

const store = configureStore();

var token = localStorage.getItem("jwt");
if (token) {
  store.dispatch({ type: types.AUTH_USER });
} else {
  store.dispatch({ type: types.UNAUTH_USER });
}

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById("react-app")
);
