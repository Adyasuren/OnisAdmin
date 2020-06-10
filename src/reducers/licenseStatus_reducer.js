import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  columns: [],
  rows: [],
  edit: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LICENSE_STATUS_NEW: 
      return {
        ...state,
        message: "",
        newRows: action.payload
      };
    case types.LICENSE_STATUS_ALL:
      return {
        ...state,
        error: "",
        message: "",
        rows: action.payload
      };
    default:
      return state;
  }
}
