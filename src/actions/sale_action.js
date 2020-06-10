import saleApi from "../api/saleApi";
import * as types from "./action_types";
import { showLoading } from "react-redux-loading-bar";

export function getSaleList(credentials) {
  return function(dispatch) {
    dispatch(showLoading());
    saleApi
      .getSale(credentials)
      .then(response => {
        const numberWithCommas = x => {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        for (var i = 0; i < response.value.length; i++) {
          response.value[i].slsDate = response.value[i].slsDate.slice(0, 10);
          response.value[i].amount =
            numberWithCommas(response.value[i].amount) + "₮";
        }

        dispatch({ type: types.SALELIST_SUCCESS, payload: response.value });
      })
      .catch(error => {});
  };
}

export function getStoreList(credentials) {
  return function(dispatch) {
    dispatch(showLoading());
    saleApi
      .getStore(credentials)
      .then(response => {
        dispatch({ type: types.STORELIST_SUCCESS, payload: response.value });
      })
      .catch(error => {});
  };
}

export function getYearSaleList(credentials) {
  return function(dispatch) {
    dispatch(showLoading());
    saleApi
      .getSale(credentials)
      .then(response => {
        dispatch({
          type: types.SALELIST_YEAR_SUCCESS,
          payload: response.value
        });
      })
      .catch(error => {});
  };
}

export function clearSaleList() {
  return function(dispatch) {
    dispatch({ type: types.SALELIST_CLEAR });
  };
}
