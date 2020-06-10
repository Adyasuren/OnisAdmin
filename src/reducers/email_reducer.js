import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",

  rows: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.CHECKMAIL_SUCCESS:
      return { ...state, error: "", message: "", rows: action.payload };
    default:
      return state;
  }
}
