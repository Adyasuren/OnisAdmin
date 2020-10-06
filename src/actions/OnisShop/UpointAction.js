import UpointApi from "../../api/OnisShop/UpointApi";
import * as types from "../action_types";
import { showLoading } from "react-redux-loading-bar";

export function AddUpointSettings(body) {
  return function (dispatch) {
    dispatch(showLoading());
    return UpointApi
      .AddUpointSettings(body)
      .then(response => {
        dispatch({ type: types.UPOINT_ADD_SUCCESS, payload: response.data });
        return response;
      })
      .catch(error => {
        dispatch({ type: types.UPOINT_ADD_ERROR, payload: error });
      });
  };
}

export function UpdateUpointSettings(body, id) {
  return function (dispatch) {
    dispatch(showLoading());
    return UpointApi
      .UpdateUpointSettings(body, id)
      .then(response => {
        dispatch({ type: types.UPOINT_UPDATE_SUCCESS, payload: response.data });
        return response;
      })
      .catch(error => {
        dispatch({ type: types.UPOINT_UPDATE_ERROR, payload: error });
      });
  };
}

export function GetAllUpointSettings(body) {
  return function (dispatch) {
    UpointApi
      .GetAllUpointSettings(body)
      .then(response => {
        if(response.success)
        {
          response.data.map((item, i) => {
            item.rank = i + 1;
          })
        }
        dispatch({ type: types.UPOINT_GET_ALL, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: types.UPOINT_GET_ALL_ERROR, payload: error });
      });
  };
}

