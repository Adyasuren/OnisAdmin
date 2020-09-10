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

export function GetAllDistricts() {
  return function(dispatch) {
    districtApi
      .GetAllDistricts()
      .then(response => {
        dispatch({ type: types.DISTRICT_ONIS, payload: response.data });
      })
      .catch(error => {});
  };
}
