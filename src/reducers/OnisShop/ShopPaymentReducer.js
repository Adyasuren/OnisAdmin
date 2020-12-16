import * as types from "../../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  isLoading: false,
  paymentData: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_SHOP_PAYMENT_LIST:
      return { ...state, error: "", message: "", paymentData: action.payload, isLoading: false };
    case types.GET_SHOP_PAYMENT_LIST_ERROR:
      return {...state, error: action.payload, message: "", paymentData: [], isLoading: false };
    case types.GET_SHOP_PAYMENT_LIST_FETCH:
      return { ...state, error: "", message: "", isLoading: true, paymentData: [] };
    default:
      return state;
  }
}
