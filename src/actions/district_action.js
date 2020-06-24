import * as types from "./action_types";
import districtApi from "../api/district_api";

export function getDistrict() {
  return function(dispatch) {
    districtApi
      .getDistrict()
      .then(response => {
        dispatch({ type: types.DISTRICT_ALL, payload: response.value });
      })
      .catch(error => {});
  };
}

export function getDistrictNew() {
  return function(dispatch) {
    districtApi
      .getDistrictNew()
      .then(response => {
        dispatch({ type: types.DISTRICT_ONIS, payload: response.payload.data });
      })
      .catch(error => {});
  };
}
