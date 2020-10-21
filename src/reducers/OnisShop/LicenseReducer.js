import * as types from "../../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  data: [],
  windowList: [],
  isLoading: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_ALL_WINDOW_LIST:
      return { ...state, error: "", message: "", windowList: action.payload, isLoading: false };
    case types.GET_ALL_WINDOW_ERROR:
      return {...state, error: action.payload, message: "", windowList: [], isLoading: false };
    case types.GET_ALL_WINDOW_FETCH:
      return { ...state, error: "", message: "", isLoading: true, windowList: [] };
    case types.GET_ALL_MASTER_LIST:
      return { ...state, error: "", message: "", data: action.payload, isLoading: false };
    case types.GET_ALL_MASTER_ERROR:
      return {...state, error: action.payload, message: "", data: [], isLoading: false };
    case types.GET_ALL_MASTER_FETCH:
      return { ...state, error: "", message: "", isLoading: true, data: [] };
    default:
      return state;
  }
}
