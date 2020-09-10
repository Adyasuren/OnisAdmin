import ShopUpdateApi from "../../api/OnisShop/ShopUpdateApi";
import * as types from "../action_types";


export function GetAllUpdateList(body) {
  return function (dispatch) {
    dispatch({ type: types.SHOP_UPDATE_LIST_FETCH });
    ShopUpdateApi
      .GetAllUpdateList(body)
      .then(response => {
        if(response.success)
        {
          response.data.map((item, i) => {
            item.rank = i + 1;
          });
        }
        dispatch({ type: types.SHOP_UPDATE_LIST_ALL, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: types.SHOP_UPDATE_LIST_ERROR, payload: error });
      });
  };
}