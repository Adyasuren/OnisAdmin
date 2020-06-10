import { API_URL } from "../../package.json";
class districtApi {
  static getDistrict() {
    const request = new Request(API_URL + `/api/District/Districts`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
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

export default districtApi;
