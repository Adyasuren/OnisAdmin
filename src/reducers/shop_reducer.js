import * as types from "../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  content: "",
  rows: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SHOP_POS_ALL:
      // console.log(action.payload.data);
      return { ...state, error: "", message: "", rows: action.payload.data };
    default:
      return state;
  }
}
