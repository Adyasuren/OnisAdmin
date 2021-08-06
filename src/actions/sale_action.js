import saleApi from "../api/saleApi";
import * as types from "./action_types";
import { showLoading } from "react-redux-loading-bar";

export function getSaleList(credentials) {
  return function (dispatch) {
    dispatch(showLoading());
    saleApi
      .getSale(credentials)
      .then((response) => {
        response.value.map((item, i) => {
         /*  item.amount = numberWithCommas(item.amount) */
          item.slsDate = item.slsDate.slice(0, 10);
        })

        dispatch({ type: types.SALELIST_SUCCESS, payload: response.value });
      })
      .catch((error) => {});
  };
}

export function getStoreList(credentials) {
  return function (dispatch) {
    dispatch(showLoading());
    saleApi
      .getStore(credentials)
      .then((response) => {
        dispatch({ type: types.STORELIST_SUCCESS, payload: response.value });
      })
      .catch((error) => {});
  };
}

export function GetOnisUserList() {
  return function (dispatch) {
    dispatch(showLoading());
    saleApi
      .GetOnisUserList()
      .then((response) => {
        dispatch({ type: types.ONISUSERLIST_SUCCESS, payload: response.value });
      })
      .catch((error) => {});
  };
}

export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function getYearSaleList(credentials) {
  return function (dispatch) {
    dispatch(showLoading());
    saleApi
      .getSale(credentials)
      .then((response) => {
        /* response.value.map((item, i) => {
          console.log(item)
         
          item.amount = numberWithCommas(item.amount)
          console.log(item.amount)
        }) */
        dispatch({
          type: types.SALELIST_YEAR_SUCCESS,
          payload: response.value,
        });
      })
      .catch((error) => {});
  };
}

export function clearSaleList() {
  return function (dispatch) {
    dispatch({ type: types.SALELIST_CLEAR });
  };
}
