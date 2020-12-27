import * as types from "../../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  isLoading: false,
  paymentData: [],
  successSum: 0
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_SHOP_PAYMENT_LIST:
      return { ...state, error: "", message: "", paymentData: action.payload, isLoading: false, successSum: calculateSum(action.payload) };
    case types.GET_SHOP_PAYMENT_LIST_ERROR:
      return {...state, error: action.payload, message: "", paymentData: [], isLoading: false, successSum: 0 };
    case types.GET_SHOP_PAYMENT_LIST_FETCH:
      return { ...state, error: "", message: "", isLoading: true, paymentData: [], successSum: 0 };
    default:
      return state;
  }
}

function calculateSum(data) {
  if(data) {
    if(data.length > 0) {
      let sum = 0;
      data.map((item, i) => {
        if(item.issend == 1) {
          sum += item.amount;
        }
      });
      return sum
    }
  }
  return 0;
}
