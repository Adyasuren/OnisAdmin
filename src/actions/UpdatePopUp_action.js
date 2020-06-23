import * as types from "./action_types";
import api from "../api/UpdatePopUp_api";
import { push } from "react-router-redux";

export function UpdatePopUp(id) {
  return function (dispatch) {
    api
      .UpdatePopUp(id)
      .then(response => {
        dispatch({ type: types.UPDATE_POPUP, payload: response.data });
      })
      .catch(error => { });
  };
}