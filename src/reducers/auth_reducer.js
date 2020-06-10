import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  authenticated: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.AUTH_USER:
      return { ...state, error: "", message: "", authenticated: true };
    case types.UNAUTH_USER:
      return { ...state, authenticated: false, error: action.payload };
    case types.AUTH_ERROR:
      return { ...state, error: action.payload };
    // case FORGOT_PASSWORD_REQUEST:
    //   return { ...state, message: action.payload.message };
    // case RESET_PASSWORD_REQUEST:
    //   return { ...state, message: action.payload.message };
    // case PROTECTED_TEST:
    //   return { ...state, content: action.payload.message };
    default:
      return state;
  }
}
