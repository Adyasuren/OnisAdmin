import UmoneyApi from "../../api/OnisShop/UmoneyApi";
import * as types from "../action_types";
import { showLoading } from "react-redux-loading-bar";

export function AddUmoneySettings(body) {
  return function (dispatch) {
    dispatch(showLoading());
    return UmoneyApi
      .AddUmoneySettings(body)
      .then(response => {
        dispatch({ type: types.UMONEY_ADD_SUCCESS, payload: response.data });
        return response;
      })
      .catch(error => {
        dispatch({ type: types.UMONEY_ADD_ERROR, payload: error });
      });
  };
}

export function UpdateUmoneySettings(body, id) {
  return function (dispatch) {
    dispatch(showLoading());
    return UmoneyApi
      .UpdateUmoneySettings(body, id)
      .then(response => {
        dispatch({ type: types.UMONEY_UPDATE_SUCCESS, payload: response.data });
        return response;
      })
      .catch(error => {
        dispatch({ type: types.UMONEY_UPDATE_ERROR, payload: error });
      });
  };
}

export function GetAllUmoneySettings(body) {
  return function (dispatch) {
    UmoneyApi
      .GetAllUmoneySettings(body)
      .then(response => {
        if(response.success)
        {
          response.data.map((item, i) => {
            item.rank = i + 1;
          })
        }
        dispatch({ type: types.UMONEY_GET_ALL, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: types.UMONEY_GET_ALL_ERROR, payload: error });
      });
  };
}

