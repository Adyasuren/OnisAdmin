import licenseStatusApi from "../api/licenseStatus_api";
import * as types from "./action_types";
import { showLoading } from "react-redux-loading-bar";

export function getLicenseStatus(credentials) {
  return function(dispatch) {
    dispatch(showLoading());
    return licenseStatusApi
      .getLicenseStatusApi(credentials)
      .then(response => {
        dispatch({ type: types.LICENSE_STATUS_ALL, payload: response.value });
        return response.value;
      })
      .catch(error => {
        dispatch({ type: types.LICENSE_STATUS_ERROR, payload: error });
      });
  };
}

export function getLicenseStatusByUsers(credentials) {
  return function(dispatch) {
    dispatch(showLoading());
    return licenseStatusApi
      .getLicenseStatusByUsersApi(credentials)
      .then(response => {
        dispatch({ type: types.LICENSE_STATUS_NEW, payload: response.value });
        return response.value;
      })
      .catch(error => {
        dispatch({ type: types.LICENSE_STATUS_NEW_ERROR, payload: error });
      });
  };
}