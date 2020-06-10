import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",

  rows: [],
  edit: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.TODAY_STATUS_ALL:
      return { ...state, error: "", message: "", rows: action.payload };
    default:
      return state;
  }
}
