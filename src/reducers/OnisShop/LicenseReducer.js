import * as types from "../../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  data: [],
  windowList: [],
  isLoading: false,
  licenseList: [],
  licenseListModule: [],
  groupMasterList: []
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
    case types.GET_GROUP_MASTER_LIST:
      return { ...state, error: "", message: "", groupMasterList: action.payload, isLoading: false };
    case types.GET_GROUP_MASTER_ERROR:
      return {...state, error: action.payload, message: "", groupMasterList: [], isLoading: false };
    case types.GET_GROUP_MASTER_FETCH:
      return { ...state, error: "", message: "", isLoading: true, groupMasterList: [] };
    case types.GET_ALL_LICENSE_LIST:
      return { ...state, error: "", message: "", licenseList: action.payload, isLoading: false };
    case types.GET_ALL_LICENSE_ERROR:
      return {...state, error: action.payload, message: "", licenseList: [], isLoading: false };
    case types.GET_ALL_LICENSE_FETCH:
      return { ...state, error: "", message: "", isLoading: true, licenseList: [] };
    case types.GET_ALL_LICENSEMODULE_LIST:
      return { ...state, error: "", message: "", licenseListModule: action.payload, isLoading: false };
    case types.GET_ALL_LICENSEMODULE_ERROR:
      return {...state, error: action.payload, message: "", licenseListModule: [], isLoading: false };
    case types.GET_ALL_LICENSEMODULE_FETCH:
      return { ...state, error: "", message: "", isLoading: true, licenseListModule: [] };
    default:
      return state;
  }
}
