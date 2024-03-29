import licenseApi from "../api/licenseApi";
import * as types from "./action_types";
import { push } from "react-router-redux";
import { showLoading } from "react-redux-loading-bar";

export function getLicense(credentials) {
  return function (dispatch) {
    dispatch(showLoading());
    licenseApi
      .getLicense(credentials)
      .then((response) => {
        dispatch({ type: types.LICENSE_ALL, payload: response.value });
      })
      .catch((error) => {});
  };
}

export function editLicense(row) {
  return function (dispatch) {
    dispatch({ type: types.LICENSE_EDIT_SUCCESS, payload: row });
    dispatch(push("/licenseadd"));
  };
}

export function insertLicense(licenseInfo) {
  return function (dispatch) {
    var tmp;
    var geth = new Date();
    tmp =
      geth.get +
      " " +
      geth.getHours() +
      ":" +
      geth.getMinutes() +
      ":" +
      geth.getSeconds();
    licenseInfo.insymd = tmp;
    licenseApi
      .insertLicense(licenseInfo)
      .then((response) => {
        dispatch({ type: types.LICENSE_ADD_SUCCESS, payload: "success" });
        dispatch(push("/license"));
      })
      .catch((error) => {
        dispatch({ type: types.LICENSE_ADD_ERROR, payload: error });
      });
  };
}
export function clearLicense() {
  return function (dispatch) {
    dispatch({ type: types.LICENSE_CLEAR });
  };
}
export function clearPaymentList() {
  return function (dispatch) {
    dispatch({ type: types.PAYMENTLIST_CLEAR });
  };
}

/* deskStore */

export function getDeskStore(credentials) {
  return function (dispatch) {
    dispatch(showLoading());
    licenseApi
      .getDeskStore(credentials)
      .then((response) => {
        dispatch({ type: types.DESKSTORE_ALL, payload: response.value });
      })
      .catch((error) => {});
  };
}

export function getFirstUsers(body) {
  return function (dispatch) {
    licenseApi
      .getFirstUsers(body)
      .then((response) => {
        dispatch({ type: types.GET_FIRST_USER_LIST, payload: response.value });
      })
      .catch((error) => {});
  };
}

export function getSecondUsers(body) {
  return function (dispatch) {
    licenseApi
      .getSecondUsers(body)
      .then((response) => {
        dispatch({ type: types.GET_SECOND_USER_LIST, payload: response.value });
      })
      .catch((error) => {});
  };
}

export function editDesktopCustomer(row) {
  return function (dispatch) {
    dispatch({ type: types.CUSTOMEREDIT_SUCCESS, payload: row });
    dispatch(push("/desktopcustomeredit"));
  };
}

export function GetSmsReport(body) {
  return function (dispatch) {
    dispatch(showLoading());
    return licenseApi
      .GetSmsReport(body)
      .then((response) => {
        if (response.value) {
          response.value.map((item, i) => {
            item.rank = i;
          });
        }
        dispatch({ type: types.GET_SMS_REPORT, payload: response.value });
        return response;
      })
      .catch((error) => {});
  };
}
