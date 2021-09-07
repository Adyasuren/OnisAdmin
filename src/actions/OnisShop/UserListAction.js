import UserListApi from "../../api/OnisShop/UserListApi";
import * as types from "../action_types";

export function GetAllUserList(body) {
  return function (dispatch) {
    UserListApi.GetAllUserList(body)
      .then((response) => {
        if (response.success) {
          response.data.map((item, i) => {
            item.rank = i + 1;
          });
        }
        dispatch({
          type: types.SHOP_USER_LIST_ALL,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({ type: types.SHOP_USER_LIST_ERROR, payload: error });
      });
  };
}

export function GetUserMapList(body) {
  return function (dispatch) {
    UserListApi.GetUserMapList(body)
      .then((response) => {
        if (response.success) {
          response.data.map((item, i) => {
            item.rank = i + 1;
          });
        }
        dispatch({
          type: types.SHOP_USER_MAP_LIST_ALL,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({ type: types.SHOP_USER_MAP_LIST_ERROR, payload: error });
      });
  };
}
