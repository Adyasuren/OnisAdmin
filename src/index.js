import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import configureStore from "./store/configureStore";
import routes from "./routes";
import * as types from "./actions/action_types";
import "react-bootstrap-table/dist/react-bootstrap-table.min.css";
import "../public/css/style.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
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
