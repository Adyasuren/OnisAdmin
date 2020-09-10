import * as types from "../../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  data: [],
  isLoading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SHOP_POS_ALL: 
        return {...state, isLoading: false, error: "", message: "", data: action.payload};
    case types.SHOP_POS_ERROR:
        return {...state, isLoading: false, error: action.payload, message: "", data: [] };
    case types.SHOP_POS_REG:
      return {...state, isLoading: false, error: "", message: ""}
    default:
      return state;
  }
}
