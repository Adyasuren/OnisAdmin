import ShopBannerApi from "../../api/OnisShop/ShopBannerApi";
import * as types from "../action_types";
import { push } from "react-router-redux";
import { showLoading } from "react-redux-loading-bar";
import {API_URL_NEW} from "../../../package.json";


export function GetAllBanner(body) {
  return function (dispatch) {
    dispatch({ type: types.SHOP_BANNER_LIST_FETCH });
    ShopBannerApi
      .GetAllBanner(body)
      .then(response => {
        if(response.success)
        {
          response.data.map((item, i) => {
            item.rank = i + 1;
          });
        }
        dispatch({ type: types.SHOP_BANNER_LIST, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: types.SHOP_BANNER_ERROR, payload: error });
      });
  };
}