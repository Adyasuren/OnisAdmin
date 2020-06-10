import { push } from "react-router-redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import * as types from "./action_types";
import authApi from "../api/auth_api";

export function loginUser(credentials) {
  return function (dispatch) {
    dispatch(showLoading());
    authApi
      .login(credentials)
      .then(response => {
        console.log(response);
        localStorage.setItem("id", response.value[0].userID)
        localStorage.setItem("logname", credentials.userName);
        localStorage.setItem("jwt", response.value[0].token);
        console.log(response.value[0].token);
        dispatch(hideLoading());
        dispatch({ type: types.AUTH_USER });
        dispatch(push("/"));
      })
      .catch(error => {
        dispatch(hideLoading());
        dispatch({ type: types.AUTH_ERROR, payload: error });
      });
  };
}

export function logoutUser() {
  return function (dispatch) {
    localStorage.removeItem("jwt");
    localStorage.removeItem("logname");
    dispatch({ type: types.UNAUTH_USER });
    dispatch(push("/login"));
  };
}
