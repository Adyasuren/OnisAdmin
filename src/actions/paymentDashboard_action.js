import paymentDashBoardApi from "../api/paymentDashBoard_api";
import * as types from "./action_types";
import { showLoading } from "react-redux-loading-bar";

export function getPaymentDashBoardData(credentials) {
  return function(dispatch) {
    dispatch(showLoading());
    return paymentDashBoardApi
      .getPaymentDashData(credentials)
      .then(response => {
        dispatch({
          type: types.PAYMENT_DASHBOARD_ALL,
          payload: response.value
        });
        return response.value;
      })
      .catch(error => {
        dispatch({ type: types.PAYMENT_DASHBOARD_ERROR, payload: error });
      });
  };
}
