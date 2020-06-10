import feedback_api from "../api/feedback_api";
import * as types from "./action_types";
import { showLoading } from "react-redux-loading-bar";

export function getFeedback(credentials) {
  return function(dispatch) {
    dispatch(showLoading());
    feedback_api
      .getFeedbacks(credentials)
      .then(response => {
        dispatch({ type: types.FEEDBACK_ALL, payload: response.value });
        return response.value;
      })
      .catch(error => {});
  };
}
