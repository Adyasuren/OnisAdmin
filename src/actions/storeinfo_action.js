import customerApi from "../api/customerApi";
import * as types from "./action_types";
import { showLoading } from "react-redux-loading-bar";

export function storeInfo(credentials) {
  return function(dispatch) {
    dispatch(showLoading());
    customerApi
      .storeInfo(credentials)
      .then(response => {
        dispatch({
          type: types.CUSTOMERIINFO_SUCCESS,
          payload: response.value
        });
      })
      .catch(error => {});
  };
}
