import transacApi from "../api/transac_api";
import * as types from "./action_types";
import { push } from "react-router-redux";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export function search_att(row) {
  return function(dispatch) {
    dispatch({ type: types.SEARCH_ATT, payload: row });
    dispatch(push("/transacadd"));
  };
}
