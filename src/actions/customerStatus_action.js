import customerStatusApi from "../api/customerStatusApi";
import * as types from "./action_types";
import { showLoading } from "react-redux-loading-bar";

export function getCustomerStatus(credentials) {
  return function(dispatch) {
    dispatch(showLoading());
    return customerStatusApi
      .getCustomerStatus(credentials)
      .then(response => {
        dispatch({ type: types.CUSTOMER_STATUS_ALL, payload: response.value });
        return response.value;
      })
      .catch(error => {
        dispatch({ type: types.CUSTOMER_STATUS_ERROR, payload: error });
      });
  };
}
