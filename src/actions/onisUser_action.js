import * as types from "./action_types";
import OnisUserApi from "../api/OnisUser_api";
import { push } from "react-router-redux";

export function userList(body) {
  return function (dispatch) {
    OnisUserApi
      .userList(body)
      .then(response => {
        dispatch({ type: types.ONIS_USER, payload: response});
      })
      .catch({});
  };
}