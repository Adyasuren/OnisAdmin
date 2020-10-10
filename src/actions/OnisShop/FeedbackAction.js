import FeedbackApi from "../../api/OnisShop/FeedbackApi";
import * as types from "../action_types";
import { push } from "react-router-redux";
import { showLoading } from "react-redux-loading-bar";
import { API_URL_NEW } from "../../../package.json";

export function GetAllFeedBack(body) {
  return function (dispatch) {
    dispatch({ type: types.GET_ALL_FEEDBACK_FETCH });
    return FeedbackApi.GetAllFeedBack(body)
      .then((response) => {
        if (response.success)
          dispatch({
            type: types.GET_ALL_FEEDBACK_LIST,
            payload: response.data,
          });
        return response;
      })
      .catch((error) => {
        dispatch({ type: types.GET_ALL_FEEDBACK_ERROR, payload: error });
      });
  };
}
