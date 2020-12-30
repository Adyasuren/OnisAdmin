import MobicomApi from "../../api/OnisShop/MobicomApi";
import * as types from "../action_types";
import { push } from "react-router-redux";
import { showLoading } from "react-redux-loading-bar";
import {API_URL_NEW} from "../../../package.json";


export function GetAllDillerList(body) {
  return function (dispatch) {
    dispatch({ type: types.MOBICOM_DILLER_LIST_FETCH });
    MobicomApi
      .GetAllDillerList(body)
      .then(response => {
        if(response.success)
        {
          response.data.map((item, i) => {
            item.rank = i + 1;
          });
        }
        dispatch({ type: types.MOBICOM_DILLER_LIST, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: types.MOBICOM_DILLER_ERROR, payload: error });
      });
  };
}

export function GetAllDillerPaymentList(body) {
  return function (dispatch) {
    dispatch({ type: types.MOBICOM_DILLER_PAYMENT_LIST_FETCH });
    MobicomApi
      .GetAllDillerPaymentList(body)
      .then(response => {
        if(response.success)
        {
          response.data.map((item, i) => {
            item.rank = i + 1;
          });
        }
        dispatch({ type: types.MOBICOM_DILLER_PAYMENT_LIST, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: types.MOBICOM_DILLER_PAYMENT_LIST_ERROR, payload: error });
      });
  };
}

export function GetDealerList() {
  return function (dispatch) {
    dispatch({ type: types.MOBICOM_GET_DILLER_LIST_FETCH });
    MobicomApi
      .GetDealerList()
      .then(response => {
        dispatch({ type: types.MOBICOM_GET_DILLER_LIST, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: types.MOBICOM_GET_DILLER_ERROR, payload: error });
      });
  };
}

export function GetAllDillerSaleList(body) {
  return function (dispatch) {
    dispatch({ type: types.MOBICOM_DILLER_SALE_LIST_FETCH });
    MobicomApi
      .GetAllDillerSaleList(body)
      .then(response => {
        if(response.success)
        {
          response.data.map((item, i) => {
            item.rank = i + 1;
          });
        }
        dispatch({ type: types.MOBICOM_DILLER_SALE_LIST, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: types.MOBICOM_DILLER_SALE_LIST_ERROR, payload: error });
      });
  };
}