import { API_URL_NEW } from "../../package.json";

class UserPosApi {
  static posApiList(body) {
    const request = new Request(API_URL_NEW + `api/posapi`, {
      //credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(body),
    });

    return fetch(request)
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          return response.text().then((text) => {
            return Promise.reject(text);
          });
        }
        return response.json();
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  static regPosApi(regno, file) {
    const request = new Request(API_URL_NEW + `api/posapi/` + regno, {
      method: "POST",
      // headers: new Headers({
      //   "Content-Type": "application/json",
      //   Accept: "application/json, text/plain, */*",
      //   "Access-Control-Allow-Headers": "*",
      // }),
      body: file,
    });

    return fetch(request)
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          return response.text().then((text) => {
            return Promise.reject(text);
          });
        }
        return response.json();
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export default UserPosApi;
