import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  data: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.DISTRICT_ONIS:
      return { ...state, error: "", message: "", data: action.payload };
    
    default:
      return state;
  }
}
