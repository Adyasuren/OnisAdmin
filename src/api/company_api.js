import { API_URL } from "../../package.json";
class companyApi {
  static insertCompany(companyInfo) {
    const request = new Request(API_URL + `/api/v1/company`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }),
      Body: JSON.stringify(companyInfo)
    });

    return fetch(request)
      .then(response => {
        if (response.status >= 400 && response.status < 600) {
          return response.text().then(text => {
            return Promise.reject(text);
          });
        }
        return response.json();
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}

export default companyApi;
