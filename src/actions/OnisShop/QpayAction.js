import QpayApi from "../../api/OnisShop/QPayApi";
import * as types from "../action_types";
import { showLoading } from "react-redux-loading-bar";

export function AddQpaySettings(body) {
  return function (dispatch) {
    dispatch(showLoading());
    return QpayApi
      .AddQpaySettings(body)
      .then(response => {
        dispatch({ type: types.QPAY_ADD_SUCCESS, payload: response.data });
        return response;
      })
      .catch(error => {
        dispatch({ type: types.QPAY_ADD_ERROR, payload: error });
      });
  };
}

export function UpdateQpaySettings(body, id) {
  return function (dispatch) {
    dispatch(showLoading());
    return QpayApi
      .UpdateQpaySettings(body, id)
      .then(response => {
        dispatch({ type: types.QPAY_UPDATE_SUCCESS, payload: response.data });
        return response;
      })
      .catch(error => {
        dispatch({ type: types.QPAY_UPDATE_ERROR, payload: error });
      });
  };
}

export function GetAllQpaySettings(body) {
  return function (dispatch) {
    QpayApi
      .GetAllQpaySettings(body)
      .then(response => {
        if(response.success)
        {
          response.data.map((item, i) => {
            item.rank = i + 1;
          })
        }
        dispatch({ type: types.QPAY_GET_ALL, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: types.QPAY_GET_ALL_ERROR, payload: error });
      });
  };
}

