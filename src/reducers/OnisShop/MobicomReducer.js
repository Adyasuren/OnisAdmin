import * as types from "../../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  data: [],
  isLoading: false,
  saleList: [],
  paymentList: [],
  paymentSum: 0,
  dealerList: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.MOBICOM_DILLER_LIST: 
        return { ...state, error: "", message: "", data: action.payload, isLoading: false };
    case types.MOBICOM_DILLER_ERROR:
        return { ...state, error: action.payload, message: "", data: [], isLoading: false };
    case types.MOBICOM_DILLER_LIST_FETCH:
        return { ...state, error: "", message: "", isLoading: true }
    case types.MOBICOM_DILLER_PAYMENT_LIST: 
        return { ...state, error: "", message: "", paymentList: action.payload, paymentSum: calculateSum( action.payload), isLoading: false };
    case types.MOBICOM_DILLER_PAYMENT_LIST_ERROR:
        return { ...state, error: action.payload, message: "", paymentList: [], isLoading: false };
    case types.MOBICOM_DILLER_PAYMENT_LIST_FETCH:
        return { ...state, error: "", message: "", isLoading: true }
    case types.MOBICOM_DILLER_SALE_LIST: 
        return { ...state, error: "", message: "", saleList: action.payload, isLoading: false };
    case types.MOBICOM_DILLER_SALE_LIST_ERROR:
        return { ...state, error: action.payload, message: "", saleList: [], isLoading: false };
    case types.MOBICOM_DILLER_SALE_LIST_FETCH:
        return { ...state, error: "", message: "", isLoading: true }
    case types.MOBICOM_GET_DILLER_LIST: 
        return { ...state, error: "", message: "", dealerList: action.payload, isLoading: false };
    case types.MOBICOM_GET_DILLER_ERROR:
        return { ...state, error: action.payload, message: "", dealerList: [], isLoading: false };
    case types.MOBICOM_GET_DILLER_LIST_FETCH:
        return { ...state, error: "", message: "", isLoading: true }
    default:
      return state;
  }
}

function calculateSum(data) {
    if(data) {
      if(data.length > 0) {
        let sum = 0;
        data.map((item, i) => {
            sum += item.amount;
        });
        return sum
      }
    }
    return 0;
  }