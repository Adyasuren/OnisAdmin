import * as types from "../../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  data: [],
  columns: [],
  isLoading: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SHOP_REPORT_COLUMNS_LIST: 
        return { ...state, error: "", message: "", columns: action.payload, isLoading: false };
    case types.SHOP_REPORT_COLUMNS_ERROR:
        return { ...state, error: action.payload, message: "", columns: [], isLoading: false };
    case types.SHOP_REPORT_COLUMNS_FETCH:
        return { ...state, error: "", message: "", isLoading: true }
    case types.SHOP_REPORT_DATA_LIST: 
        return { ...state, error: "", message: "", data: action.payload, isLoading: false };
    case types.SHOP_REPORT_DATA_ERROR:
        return { ...state, error: action.payload, message: "", data: [], isLoading: false };
    case types.SHOP_REPORT_DATA_FETCH:
        return { ...state, error: "", message: "", isLoading: true }    
    default:
      return state;
  }
}
