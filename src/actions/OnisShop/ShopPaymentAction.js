import ShopPaymentApi from "../../api/OnisShop/ShopPaymentApi";
import * as types from "../action_types";
import { showLoading } from "react-redux-loading-bar";

export function GetPaymentList(body) {
  return function (dispatch) {
    dispatch({ type: types.GET_SHOP_PAYMENT_LIST_FETCH });
    return ShopPaymentApi.GetPaymentList(body)
      .then((response) => {
        if (response.success)
        response.data.map((item, i) => {
          item.rank = i + 1;
        })
          dispatch({
            type: types.GET_SHOP_PAYMENT_LIST,
            payload: response.data,
          });
        return response;
      })
      .catch((error) => {
        dispatch({ type: types.GET_SHOP_PAYMENT_LIST_ERROR, payload: error });
      });
  };
}
