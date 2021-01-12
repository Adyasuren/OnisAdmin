import { API_URL_NEW, key } from "../../../package.json";

class UmoneyApi {
  static AddUmoneySettings(body) {
    const request = new Request(API_URL_NEW + `/api/umoney/${key}`, {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
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

  static UpdateUmoneySettings(body, id) {
    const request = new Request(API_URL_NEW + `/api/umoney/${id}/${key}`, {
      method: "PUT",
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
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

  static GetAllUmoneySettings(body) {
    const request = new Request(API_URL_NEW + `/api/umoney/list/${key}`, {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(body),
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

export default UmoneyApi;
