import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  rows: [],
  details: [],
  edit: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SELLER_ALL:
      return { ...state, error: "", message: "", details: action.payload };
    case types.DEALER_ALL:
      return { ...state, error: "", message: "", rows: action.payload };
    default:
      return state;
  }
}
