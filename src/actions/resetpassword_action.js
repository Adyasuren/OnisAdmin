import * as types from "./action_types";
import resetPasswordApi from "../api/resetpassword_api";

export function resetPassword(value) {
  return function(dispatch) {
    resetPasswordApi
      .resetPassword(value)
      .then(response => {
        dispatch({
          type: types.RESETPASSWORD_SUCCESS,
          payload: response.success
        });
      })
      .catch(error => {
        dispatch({ type: types.RESETPASSWORD_ERROR, payload: error });
      });
  };
}
