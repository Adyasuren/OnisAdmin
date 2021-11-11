import * as types from "../../actions/action_types";

const INITIAL_STATE = {
  error: "",
  message: "",
  data: [],
  windowList: [],
  isLoading: false,
  licenseList: [],
  licenseListModule: [],
  groupMasterList: [],
  successSum: 0,
  successSumModule:0
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
      return { ...state, error: "", message: "", licenseList: action.payload, isLoading: false, successSum: calculateSum(action.payload) };
    case types.GET_ALL_LICENSE_ERROR:
      return {...state, error: action.payload, message: "", licenseList: [], isLoading: false, successSum: 0 };
    case types.GET_ALL_LICENSE_FETCH:
      return { ...state, error: "", message: "", isLoading: true, licenseList: [], successSum: 0 };
    case types.GET_ALL_LICENSEMODULE_LIST:
      return { ...state, error: "", message: "", licenseListModule: action.payload, isLoading: false, successSumModule: calculateSumModule(action.payload) };
    case types.GET_ALL_LICENSEMODULE_ERROR:
      return {...state, error: action.payload, message: "", licenseListModule: [], isLoading: false, successSumModule: 0 };
    case types.GET_ALL_LICENSEMODULE_FETCH:
      return { ...state, error: "", message: "", isLoading: true, licenseListModule: [], successSumModule: 0 };
    default:
      return state;
  }
}

function calculateSum(data) {
  if(data) {
    if(data.length > 0) {
      let sum = 0;
      data.map((item, i) => {
        if(item.status == 2) {
          sum += item.amount;
        }
      });
      return sum
    }
  }
  return 0;
}

function calculateSumModule(data) {
  if(data) {
    if(data.length > 0) {
      let sum = 0;
      data.map((item, i) => {
        if(item.status == 2 || item.status == null) {
          sum += item.amount;
        }
      });
      return sum
    }
  }
  return 0;
}