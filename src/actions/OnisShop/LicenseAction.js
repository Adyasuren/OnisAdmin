import LicenseApi from "../../api/OnisShop/LicenseApi";
import * as types from "../action_types";
import { push } from "react-router-redux";
import { showLoading } from "react-redux-loading-bar";
import { API_URL_NEW } from "../../../package.json";

export function GetAllWindowList() {
  return function (dispatch) {
    dispatch({ type: types.GET_ALL_WINDOW_FETCH });
    return LicenseApi.GetAllWindowList()
      .then((response) => {
        if (response.success)
          dispatch({
            type: types.GET_ALL_WINDOW_LIST,
            payload: response.data,
          });
        return response;
      })
      .catch((error) => {
        dispatch({ type: types.GET_ALL_WINDOW_ERROR, payload: error });
      });
  };
}

export function AddMaster(body) {
  return function (dispatch) {
    dispatch(showLoading());
    return LicenseApi
      .AddMaster(body)
      .then(response => {
        dispatch({ type: types.SHOP_MASTER_ADD_SUCCESS, payload: response.data });
        return response;
      })
      .catch(error => {
        dispatch({ type: types.SHOP_MASTER_ADD_ERROR, payload: error });
      });
  };
}

export function GetAllMasterList() {
  return function (dispatch) {
    dispatch({ type: types.GET_ALL_MASTER_FETCH });
    return LicenseApi.GetAllMasterList()
      .then((response) => {
        if (response.success)
        response.data.map((item, i) => {
          item.rank = i + 1;
        })
          dispatch({
            type: types.GET_ALL_MASTER_LIST,
            payload: response.data,
          });
        return response;
      })
      .catch((error) => {
        dispatch({ type: types.GET_ALL_MASTER_ERROR, payload: error });
      });
  };
}
