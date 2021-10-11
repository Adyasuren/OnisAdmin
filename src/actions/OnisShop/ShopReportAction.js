import ShopReportApi from "../../api/OnisShop/ShopReportApi";
import * as types from "../action_types";
import { push } from "react-router-redux";
import { showLoading } from "react-redux-loading-bar";
import { API_URL_NEW } from "../../../package.json";

export function GetAllColumns() {
  return function (dispatch) {
    dispatch({ type: types.SHOP_REPORT_COLUMNS_FETCH });
    return ShopReportApi.GetAllColumns()
      .then((response) => {
        if (response.success)
          dispatch({
            type: types.SHOP_REPORT_COLUMNS_LIST,
            payload: response.data,
          });
        return response;
      })
      .catch((error) => {
        dispatch({ type: types.SHOP_REPORT_COLUMNS_ERROR, payload: error });
      });
  };
}

export function GetShopReportUser(body) {
  return function (dispatch) {
    dispatch({ type: types.SHOP_REPORT_DATA_FETCH });
    return ShopReportApi.GetShopReportUser(body)
      .then((response) => {
        if (response.success)
          dispatch({ type: types.SHOP_REPORT_DATA_LIST, payload: response.data });
        return response;
      })
      .catch((error) => {
        dispatch({ type: types.SHOP_REPORT_DATA_ERROR, payload: error });
      });
  };
}
