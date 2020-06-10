import emailApi from "../api/email_api";
import * as types from "./action_types";

export function checkemail(value) {
  return function(dispatch) {
    emailApi
      .checkemail(value)
      .then(response => {
        dispatch({ type: types.CHECKMAIL_SUCCESS, payload: response.success });
      })
      .catch(error => {
        dispatch({ type: types.CHECKMAIL_ERROR, payload: error });
      });
  };
}
