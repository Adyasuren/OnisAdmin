import customerApi from "../api/customerApi";
import * as types from "./action_types";
import { push } from "react-router-redux";
import { showLoading } from "react-redux-loading-bar";

export function getCustomer(credentials) {
  return function (dispatch) {
    dispatch(showLoading());
    customerApi
      .getCustomers(credentials)
      .then(response => {
        dispatch({ type: types.CUSTOMER_ALL, payload: response.value });
        return response.value;
      })
      .catch(error => { });
  };
}

export function insertCustomer(customerInfo) {
  return function (dispatch) {
    customerApi
      .insertCustomer(customerInfo)
      .then(response => {
        dispatch({ type: types.CUSTOMER_ADD_SUCCESS, payload: "success" });
        dispatch(push("/customerlist"));
      })
      .catch(error => {
        dispatch({ type: types.CUSTOMER_ADD_ERROR, payload: error });
      });
  };
}

export function updateCustomer(customerInfo) {
  return function (dispatch) {
    customerApi
      .updateCustomer(customerInfo)
      .then(response => {
        dispatch({ type: types.CUSTOMER_ADD_SUCCESS, payload: "success" });
        dispatch(push("/customerlist"));
      })
      .catch(error => {
        dispatch({ type: types.CUSTOMER_ADD_ERROR, payload: error });
      });
  };
}

export function clearUsers() {
  return function (dispatch) {
    dispatch({ type: types.CUSTOMER_CLEAR });
  };
}

export function editCustomer(row) {
  return function (dispatch) {
    dispatch({ type: types.CUSTOMEREDIT_SUCCESS, payload: row });
    dispatch(push("/customereditlist"));
  };
}
