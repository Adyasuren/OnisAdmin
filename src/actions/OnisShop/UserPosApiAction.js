import UserPosApi from "../../api/OnisShop/UserPosApi";
import * as types from "../action_types";
import { showLoading } from "react-redux-loading-bar";

export function GetAllPosApiList(body) {
  return function (dispatch) {
    UserPosApi.GetAllPosApiList(body)
      .then((response) => {
        if(response.success)
        {
          response.data.map((item, i) => {
            item.rank = i + 1;
          })
        }
        dispatch({
          type: types.SHOP_POS_ALL,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({ type: types.SHOP_POS_ERROR, payload: error });
      });
  };
}

export function RegisterPosApi(regno, data) {
  return function (dispatch) {
    UserPosApi.RegisterPosApi(regno, data)
      .then((response) => {
        dispatch({ type: types.SHOP_POS_REG, payload: response.data });
        return response;
      })
      .catch((error) => {
          console.log(error)
        dispatch({ type: types.SHOP_POS_ERROR, payload: error });
      });
  };
}