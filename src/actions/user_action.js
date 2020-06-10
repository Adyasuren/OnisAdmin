import userApi from "../api/user_api";
import * as types from "./action_types";
import { showLoading } from "react-redux-loading-bar";

export function getUsers(credentials) {
  return function(dispatch) {
    dispatch(showLoading());
    userApi
      .getUsers()
      .then(response => {
        setTimeout(() => {
          dispatch({ type: types.USER_ALL, payload: response.value });
        }, 3000);
      })
      .catch(error => {
        dispatch({ type: types.USER_ERROR, payload: error });
      });
  };
}
