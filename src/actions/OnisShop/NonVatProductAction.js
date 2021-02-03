import NonVatPruductApi from "../../api/OnisShop/NonVatPruductApi";
import * as types from "../action_types";

export function GetProduct(body) {
  return function (dispatch) {
    dispatch({ type: types.GET_ALL_PRODUCT_FETCH });
    return NonVatPruductApi.GetProducts(body)
      .then((response) => {
        if(response.success)
        {
          response.data.map((item, i) => {
            item.rank = i + 1;
          });
        }
          dispatch({
            type: types.GET_ALL_PRODUCT_LIST,
            payload: response.data,
          });
        return response;
      })
      .catch((error) => {
        dispatch({ type: types.GET_ALL_PRODUCT_ERROR, payload: error });
      });
  };
}

export function AddNonVatProduct(body) {
  return function (dispatch) {
   //dispatch(showLoading());
    return NonVatPruductApi
      .AddProduct(body)
      .then(response => {
        dispatch({ type: types.NON_VAT_PRODUCT_ADD_SUCCESS, payload: response.data });
        return response;
      })
      .catch(error => {
        dispatch({ type: types.NON_VAT_PRODUCT_ADD_ERROR, payload: error });
      });
  };
}
