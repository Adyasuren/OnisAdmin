import * as types from "../../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  data: [],
  mapData: [],
  isLoading: false,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SHOP_USER_LIST_ALL:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "",
        data: action.payload,
      };
    case types.SHOP_USER_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: "",
        data: [],
      };
    case types.SHOP_USER_MAP_LIST_ALL:
      return {
        ...state,
        isLoading: false,
        error: "",
        message: "",
        mapData: action.payload,
      };
    case types.SHOP_USER_MAP_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: "",
        mapData: [],
      };
    default:
      return state;
  }
}
