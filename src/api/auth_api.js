import { API_URL } from "../../package.json";

class authApi {
  static login(credentials) {
    const request = new Request(API_URL + `/api/Admin`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(credentials)
    });
    return fetch(request)
      .then(response => {
        if (response.status >= 400 && response.status < 600) {
          return response.text().then(text => {
            return Promise.reject(text);
          });
        }
        return response
          .json()
          .then(json => {
            if (json.success === true) {
              return Promise.resolve(json);
            } else {
              return Promise.reject(json.message);
            }
          })
          .catch(error => {
            return Promise.reject(error);
          });
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}

export default authApi;
