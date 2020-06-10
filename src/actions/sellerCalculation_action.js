import sellerCalculation_api from "../api/sellerCalculation_api";
import * as types from "./action_types";
import { showLoading } from "react-redux-loading-bar";

export function getSellerCalculation(credentials) {
  return function(dispatch) {
    dispatch(showLoading());
    sellerCalculation_api
      .getSellerCalculationApi(credentials)
      .then(response => {
        dispatch({ type: types.SELLER_ALL, payload: response.value });
        return response.value;
      })
      .catch(error => {
        dispatch({ type: types.SELLER_ERROR, payload: error });
      });
  };
}

export function getDealers(credentials) {
  return function(dispatch) {
    dispatch(showLoading());
    sellerCalculation_api
      .getDealersWithAmount(credentials)
      .then(response => {
        dispatch({ type: types.DEALER_ALL, payload: response.value });
        return response.value;
      })
      .catch(error => {
        dispatch({ type: types.DEALER_ERROR, payload: error });
      });
  };
}
