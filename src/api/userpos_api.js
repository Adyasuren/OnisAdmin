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

  static regPosApi(body, data) {
    const request = new Request(
      API_URL_NEW + `api/posapi/${data.regno}/${data.id}`,
      {
        method: "POST",
        headers: new Headers({
          Accept: "application/json, text/plain, */*",
          "Access-Control-Allow-Headers": "*",
        }),
        body: body,
      }
    );

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
