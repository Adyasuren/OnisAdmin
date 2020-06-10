import * as types from "./action_types";
import GoodsClassApi from "../api/GoodsClass_Api";

export function getGoodsClass() {
  return function(dispatch) {
    GoodsClassApi.getGoodsClass()
      .then(response => {
        dispatch({ type: types.GOODSCLASS_ALL, payload: response.value });
      })
      .catch(error => {});
  };
}
