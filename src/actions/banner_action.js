import bannerApi from "../api/banner_api";
import * as types from "./action_types";
import { push } from "react-router-redux";
import { showLoading } from "react-redux-loading-bar";
import {API_URL_NEW} from "../../package.json";

export function updateBanners(id, updby) {
  return function (dispatch) {
    dispatch(showLoading());
    bannerApi
      .updateBanners(id, updby)
      .then(response => {
        console.log(response)
        dispatch({ type: types.BANNEREDIT_SUCCESS, payload: response.value });
        return response.value;
      })
  };
}

export function bannerList(row) {
  return function (dispatch) {
    bannerApi
      .bannerList(row)
      .then(response => {
        dispatch({ type: types.BANNER_ALL, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: types.BANNER_ALL, payload: error });
      });
  };
}

export function insertBanners(bannerInfo, data) {
  return function (dispatch) {
    bannerApi
      .insertBanners(bannerInfo, data)
      .then(response => {
        dispatch({ type: types.BANNER_ADD_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: types.BANNER_ADD_ERROR, payload: error });
      });
  };
}

// export function updateBanners(bannerInfo) {
//   return function (dispatch) {
//     bannerApi
//       .updateBanners(bannerInfo)
//       .then(response => {
//         dispatch({ type: types.BANNER_ALL, payload: "success" });
//         dispatch(push("/bannerlist"));
//       })
//       .catch(error => {
//         dispatch({ type: types.BANNER_ALL_ERROR, payload: error });
//       });
//   };
// }

// export function clearBanners() {
//   return function (dispatch) {
//     dispatch({ type: types.BANNER_CLEAR });
//     dispatch(push("/banner_clear"));
//   };
// }

// export function bannerList(row) {
//   return function (dispatch) {
//     dispatch({ type: types.BANNEREDIT_SUCCESS, payload: row });
//     dispatch(push("/bannereditlist"));
//   };
// }
