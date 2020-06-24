import UserPosApi from "../api/userpos_api";
import * as types from "./action_types";
import { push } from "react-router-redux";
import { showLoading } from "react-redux-loading-bar";
import niceAlert from "sweetalert";

/* SHOP */

export function posApiList(body) {
  return function (dispatch) {
    UserPosApi.posApiList(body)
      .then((response) => {
        dispatch({
          type: types.SHOP_POS_ALL,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({ type: types.SHOP_POS_ERROR, payload: error });
      });
  };
}

export function regPosApi(regno, data) {
  return function (dispatch) {
    dispatch(showLoading());
    UserPosApi.regPosApi(regno, data)
      .then((response) => {
        dispatch({ type: types.SHOP_POS_REG, payload: response.data });
      })
      .catch((error) => {});
  };
}

export function delPosApi(id) {
  return function (dispatch) {
    dispatch(showLoading());
    UserPosApi.delPosApi(id)
      .then((response) => {
        if (response.success === true) {
          dispatch({
            type: types.SHOP_POS_DEL,
            payload: response.message,
          });
          niceAlert(response.message);
          dispatch(push("/shopDel"));
        } else {
          dispatch({
            type: types.SHOP_POS_DEL,
            payload: response.message,
          });
          niceAlert(response.message);
        }
      })
      .catch((error) => {});
  };
}

export function getShopApi(regno, key) {
  return function (dispatch) {
    dispatch(showLoading());
    UserPosApi.getShopApi(regno, key)
      .then((response) => {
        if (response.success === true) {
          dispatch({
            type: types.SHOP_POS_GET,
            payload: response.value,
          });
          niceAlert(response.message);
          dispatch(push("/shopGet"));
        } else {
          dispatch({
            type: types.SHOP_POS_GET,
            payload: response.message,
          });
          niceAlert(response.message);
        }
      })
      .catch((error) => {});
  };
}

export function clearNew() {
  return function (dispatch) {
    dispatch({ type: types.SHOP_POS_DEL, payload: [] });
  };
}
