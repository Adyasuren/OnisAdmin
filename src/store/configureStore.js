import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { browserHistory } from "react-router";

const middleware = compose(
  applyMiddleware(routerMiddleware(browserHistory), thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

export default function configureStore() {
  return createStore(rootReducer, middleware);
}
