import * as types from "../../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  data: [],
  isLoading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SHOP_USER_LIST_ALL: 
        return {...state, isLoading: false, error: "", message: "", data: action.payload};
    case types.SHOP_USER_LIST_ERROR:
        return {...state, isLoading: false, error: action.payload, message: "", data: [] };
    default:
      return state;
  }
}
