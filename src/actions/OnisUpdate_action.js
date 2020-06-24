import * as types from "./action_types";
import OnisUpdateApi from "../api/OnisUpdate_api";
import { push } from "react-router-redux";

export function getDistrictUpdate(body) {
  return function (dispatch) {
    OnisUpdateApi 
      .getDistrictUpdate(body)
      .then(response => {
        dispatch({ type: types.ONIS_UPDATE, payload: response.data });
      })
      .catch(error => { });
  };
}
export function editUpdate(row) {
  return function (dispatch) {
    dispatch({ type: types.UPDATEEDIT_SUCCESS, payload: row });
    dispatch(push("/UpdateEditList"));
  };
}