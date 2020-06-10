import * as types from "../actions/action_types";

const INITIAL_STATE = {
  success: "",
  message: "",
  value: "",
  rows: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.PAYMENT_ADD_SUCCESS:
      return { ...state, error: "", message: "", rows: action.payload };
    case types.PAYMENT_ADD_ERROR:
      return { ...state, error: "", message: " Error" };
    default:
      return state;
  }
}
