import transacApi from "../api/transac_api";
import * as types from "./action_types";
import { push } from "react-router-redux";
import { showLoading } from "react-redux-loading-bar";

export function insertPayment(paymentInfo) {
  return function (dispatch) {
    var tmp;
    var geth = new Date();
    var hour = geth.getHours();
    var minute = geth.getMinutes();
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    tmp = paymentInfo.trandate + "T" + hour + ":" + minute;
    paymentInfo.trandate = tmp;
    paymentInfo.statementid = 0;
    transacApi
      .insertPayment(paymentInfo)
      .then(response => {
        dispatch({ type: types.PAYMENT_ADD_SUCCESS, payload: "success" });
        dispatch(push("/paymentlist"));
      })
      .catch(error => {
        dispatch({ type: types.PAYMENT_ADD_ERROR, payload: error });
      });
  };
}
export function updatePayment(transnumber, username) {
  return function (dispatch) {
    dispatch(showLoading());
    transacApi
      .updatePayment(transnumber, username)
      .then(response => {
        dispatch({ type: types.PAYMENT_ADD_SUCCESS, payload: "success" });
        if (response.success !== true) {
          if (
            confirm(
              response.message.substring(0, 35) +
              "\n" +
              response.value.split(".", 1) +
              ".\nБуцах уу?"
            ) === true
          ) {
            dispatch(push("/paymentlist"));
          } else {
          }
        } else {
          dispatch(push("/paymentlist"));
        }
      })
      .catch(error => {
        dispatch({ type: types.PAYMENT_ADD_ERROR, payload: error });
      });
  };
}

export function cancelEdit() {
  return function (dispatch) {
    dispatch(push("/paymentlist"));
  };
}

export function editPayment(row) {
  return function (dispatch) {
    dispatch({ type: types.PAYMENTEDIT_SUCCESS, payload: row });
    dispatch(push("/transacedit"));
  };
}

export function newPayment() {
  return function (dispatch) {
    dispatch(push("/transacadd"));
  };
}
export function getPaymentListtmp(credentials) {
  return function (dispatch) {
    dispatch(showLoading());
    transacApi
      .getPaymentList(credentials)
      .then(response => {
        dispatch(push("/paymentlist"));
        dispatch({ type: types.PAYMENTLIST_SUCCESS, payload: response.value });
      })
      .catch(error => {
        dispatch({ type: types.PAYMENTLIST_ERROR, payload: error });
      });
  };
}

export function getPaymentList(credentials) {
  return function (dispatch) {
    dispatch(showLoading());
    transacApi
      .getPaymentList(credentials)
      .then(response => {
        dispatch({ type: types.PAYMENTLIST_SUCCESS, payload: response.value });
      })
      .catch(error => {
        dispatch({ type: types.PAYMENTLIST_ERROR, payload: error });
      });
  };
}
