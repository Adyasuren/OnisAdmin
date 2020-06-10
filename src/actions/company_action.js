import companyApi from "../api/company_api";
import * as types from "./action_types";

export function insertCompany(companyInfo) {
  return function(dispatch) {
    companyApi
      .insertCompany(companyInfo)
      .then(response => {
        dispatch({ type: types.COMPANY_ADD_SUCCESS, payload: response.value });
      })
      .catch(error => {
        dispatch({ type: types.COMPANY_ADD_ERROR, payload: error });
      });
  };
}
