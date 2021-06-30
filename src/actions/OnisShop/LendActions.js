import LendApi from "../../api/OnisShop/LendApi";
import * as types from "../action_types";
import { showLoading } from "react-redux-loading-bar";

export function AddLendSettings(body) {
  return function (dispatch) {
    dispatch(showLoading());
    return LendApi
      .AddLendSettings(body)
      .then(response => {
        dispatch({ type: types.LEND_ADD_SUCCESS, payload: response.data });
        return response;
      })
      .catch(error => {
        dispatch({ type: types.LEND_ADD_ERROR, payload: error });
      });
  };
}

export function UpdateLendSettings(body, id) {
  return function (dispatch) {
    dispatch(showLoading());
    return LendApi
      .UpdateLendSettings(body, id)
      .then(response => {
        dispatch({ type: types.LEND_UPDATE_SUCCESS, payload: response.data });
        return response;
      })
      .catch(error => {
        dispatch({ type: types.LEND_UPDATE_ERROR, payload: error });
      });
  };
}

export function GetAllLendSettings(body) {
  return function (dispatch) {
    LendApi
      .GetAllLendSettings(body)
      .then(response => {
        if(response.success)
        {
          response.data.map((item, i) => {
            item.rank = i + 1;
          })
        }
        dispatch({ type: types.LEND_GET_ALL, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: types.LEND_GET_ALL_ERROR, payload: error });
      });
  };
}

