import { API_URL } from "../../package.json";

class transacApi {
  static insertPayment(paymentInfo) {
    const request = new Request(API_URL + `/api/Admin/AddPayment`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }),
      body: JSON.stringify(paymentInfo)
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

  static getPaymentList(credentials) {
    const request = new Request(API_URL + `/api/Admin/PaymentNewList`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
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
        return response.json();
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }

  static updatePayment(transnumber, username) {
    const request = new Request(
      API_URL +
        `/api/Admin/AddLicenseByPayment/` +
        transnumber +
        `/` +
        username,
      {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + localStorage.getItem("jwt")
        })
      }
    );
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

export default transacApi;
