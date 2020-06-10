import todayStatusApi from "../api/todayStatusApi";
import * as types from "./action_types";
import { showLoading } from "react-redux-loading-bar";

export function getTodayStatus(credentials) {
  return function(dispatch) {
    dispatch(showLoading());
    todayStatusApi
      .getTodayStatus(credentials)
      .then(response => {
        dispatch({ type: types.TODAY_STATUS_ALL, payload: response.value });
      })
      .catch(error => {
        dispatch({ type: types.TODAY_STATUS_ERROR, payload: error });
      });
  };
}
