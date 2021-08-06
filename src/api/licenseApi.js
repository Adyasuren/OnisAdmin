import { API_URL } from "../../package.json";
class licenseApi {
  static getLicense(credentials) {
    const request = new Request(API_URL + `/api/Admin/LicenseListNew`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      }),
      body: JSON.stringify(credentials),
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

  static insertLicense(licenseInfo) {
    const request = new Request(API_URL + `/api/Admin/AddLicense`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      }),
      body: JSON.stringify(licenseInfo),
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

  static AddSmsQty(body) {
    const request = new Request(API_URL + `/api/Admin/smsadd`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      }),
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

  static GetAddSmsLog(userid) {
    const request = new Request(API_URL + `/api/Admin/smsaddlog/${userid}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
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

  static GetSmsReport(body) {
    const request = new Request(API_URL + `/api/Admin/smsreport`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      }),
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

  static insertMultipleCustomerPayment(data) {
    const request = new Request(API_URL + `/api/Admin/AddPayment`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      }),
      body: JSON.stringify(data),
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
  static LicenseSwap(body) {
    const request = new Request(API_URL + `/api/Admin/licenseswap`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      }),
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
  static getFirstUsers() {
    const request = new Request(API_URL +`/api/Admin/user1list`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
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
  // action, reducer, store

  static getSecondUsers() {
    const request = new Request(API_URL +`/api/Admin/user12list`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
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
  static getUsersInfo(username) {
    const request = new Request(API_URL +`/api/Admin/userinfo/${username}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
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

export default licenseApi;
