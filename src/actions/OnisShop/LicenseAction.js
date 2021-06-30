import LicenseApi from "../../api/OnisShop/LicenseApi";
import * as types from "../action_types";
import { showLoading } from "react-redux-loading-bar";

export function GetAllWindowList() {
  return function (dispatch) {
    dispatch({ type: types.GET_ALL_WINDOW_FETCH });
    return LicenseApi.GetAllWindowList()
      .then((response) => {
        if (response.success)
          dispatch({
            type: types.GET_ALL_WINDOW_LIST,
            payload: response.data,
          });
        return response;
      })
      .catch((error) => {
        dispatch({ type: types.GET_ALL_WINDOW_ERROR, payload: error });
      });
  };
}

export function AddMaster(body) {
  return function (dispatch) {
    dispatch(showLoading());
    return LicenseApi
      .AddMaster(body)
      .then(response => {
        dispatch({ type: types.SHOP_MASTER_ADD_SUCCESS, payload: response.data });
        return response;
      })
      .catch(error => {
        dispatch({ type: types.SHOP_MASTER_ADD_ERROR, payload: error });
      });
  };
}

export function GetAllMasterList() {
  return function (dispatch) {
    dispatch({ type: types.GET_ALL_MASTER_FETCH });
    return LicenseApi.GetAllMasterList()
      .then((response) => {
        if (response.success)
        response.data.map((item, i) => {
          item.rank = i + 1;
        })
          dispatch({
            type: types.GET_ALL_MASTER_LIST,
            payload: response.data,
          });
        return response;
      })
      .catch((error) => {
        dispatch({ type: types.GET_ALL_MASTER_ERROR, payload: error });
      });
  };
}

export function GetGroupedMasterList() {
  return function (dispatch) {
    dispatch({ type: types.GET_GROUP_MASTER_ERROR });
    return LicenseApi.GetGroupedMasterList()
      .then((response) => {
        if (response.success)
        response.data.map((item, i) => {
          item.rank = i + 1;
        })
          dispatch({
            type: types.GET_GROUP_MASTER_LIST,
            payload: response.data,
          });
        return response;
      })
      .catch((error) => {
        dispatch({ type: types.GET_GROUP_MASTER_ERROR, payload: error });
      });
  };
}

export function GetAllLisenceList(body) {
  return function (dispatch) {
    dispatch({ type: types.GET_ALL_LICENSE_FETCH });
    return LicenseApi.GetAllLisenceList(body)
      .then((response) => {
        if (response.success)
        response.data.map((item, i) => {
          item.rank = i + 1;
        })
          dispatch({
            type: types.GET_ALL_LICENSE_LIST,
            payload: response.data,
          });
        return response;
      })
      .catch((error) => {
        dispatch({ type: types.GET_ALL_LICENSE_ERROR, payload: error });
      });
  };
}

export function GetAllLisenceModule(body) {
  return function (dispatch) {
    dispatch({ type: types.GET_ALL_LICENSEMODULE_FETCH });
    return LicenseApi.GetAllLisenceModule(body)
      .then((response) => {
        if (response.success)
        response.data.map((item, i) => {
          item.rank = i + 1;
        })
          dispatch({
            type: types.GET_ALL_LICENSEMODULE_LIST,
            payload: response.data,
          });
        return response;
      })
      .catch((error) => {
        dispatch({ type: types.GET_ALL_LICENSEMODULE_ERROR, payload: error });
      });
  };
}

export function AddLicense(body) {
  return function (dispatch) {
    dispatch(showLoading());
    return LicenseApi
      .AddLicense(body)
      .then(response => {
        dispatch({ type: types.SHOP_LICENSE_ADD_SUCCESS, payload: response.data });
        return response;
      })
      .catch(error => {
        dispatch({ type: types.SHOP_LICENSE_ADD_ERROR, payload: error });
      });
  };
}

export function GetLicenseWindows(id) {
  return function (dispatch) {
    return LicenseApi
      .GetLicenseWindows(id)
      .then(response => {
        if(response.success) {
          response.data.map((item, i) => {
            item.rank = i + 1;
          })
        }
        
        return response;
      })
      .catch(error => {
      });
  };
}
