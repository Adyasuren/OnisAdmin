import MarchantApi from "../../api/OnisShop/MarchantApi";
import * as types from "../action_types";
import { push } from "react-router-redux";
import { showLoading } from "react-redux-loading-bar";
import { API_URL_NEW } from "../../../package.json";

export function GetAllColumns() {
  return function (dispatch) {
    dispatch({ type: types.MERCHANT_COLUMNS_FETCH });
    return MarchantApi.GetAllColumns()
      .then((response) => {
        if (response.success)
          dispatch({
            type: types.MERCHANT_COLUMNS_LIST,
            payload: response.data,
          });
        return response;
      })
      .catch((error) => {
        dispatch({ type: types.MERCHANT_COLUMNS_ERROR, payload: error });
      });
  };
}

export function GetMerchantData(body) {
  return function (dispatch) {
    dispatch({ type: types.MERCHANT_DATA_FETCH });
    return MarchantApi.GetMerchantData(body)
      .then((response) => {
        if (response.success)
          dispatch({ type: types.MERCHANT_DATA_LIST, payload: response.data });
        return response;
      })
      .catch((error) => {
        dispatch({ type: types.MERCHANT_DATA_ERROR, payload: error });
      });
  };
}

export function GetHistory(storeid, code) {
  return function (dispatch) {
    dispatch({ type: types.MERCHANT_HISTORY_FETCH });
    return MarchantApi.GetHistory(storeid, code)
      .then((response) => {
        if (response.success) {
          dispatch({
            type: types.MERCHANT_HISTORY_LIST,
            payload: response.data,
          });
          response.data.map((item, i) => {
            item.rank = i + 1;
          });
        }
        return response;
      })
      .catch((error) => {
        dispatch({ type: types.MERCHANT_HISTORY_ERROR, payload: error });
      });
  };
}
