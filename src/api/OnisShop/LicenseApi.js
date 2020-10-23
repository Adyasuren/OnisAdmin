import { API_URL_NEW } from "../../../package.json";

class LicenseApi {
  static GetAllWindowList() {
    const request = new Request(API_URL_NEW + `api/license/menu`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
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


  static AddMaster(body) {
    const request = new Request(API_URL_NEW + `api/license/master`, {
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

  static GetAllMasterList() {
    const request = new Request(API_URL_NEW + `api/license/master/list`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
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

  static GetGroupedMasterList() {
    const request = new Request(API_URL_NEW + `api/license/master/group`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
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

  static GetAllLisenceList() {
    const request = new Request(API_URL_NEW + `api/license/list`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
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

  static AddLicense(body) {
    const request = new Request(API_URL_NEW + `api/license`, {
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

export default LicenseApi;
