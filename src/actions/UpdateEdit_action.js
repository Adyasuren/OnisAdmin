import * as types from "./action_types";
import UpdateEditApi from "../api/UpdateEdit_api";
import { push } from "react-router-redux";

export function updateEdit(credentials) {
  return function (dispatch) {
    UpdateEditApi.updateEdit(credentials)
      .then((response) => {
        dispatch({ type: types.UPDATE_EDIT, payload: response.data });
      })
      .catch((error) => {});
  };
}
export function regPosApi(regno, data) {
  return function (dispatch) {
    //   dispatch(showLoading());
    UpdateEditApi.regPosApi(regno, data)
      .then((response) => {
        dispatch({ type: types.SHOP_POS_REG, payload: response.data });
      })
      .catch((error) => {});
  };
}

export function cancelEdit() {
  return function (dispatch) {
    dispatch(push("/UpdateList"));
  };
}
