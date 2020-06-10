import { API_URL } from "../../package.json";

class customerApi {
  static getCustomers(credentials) {
    const request = new Request(API_URL + `/api/Admin/StoreUserList`, {
      method: "POST",
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

  static insertCustomer(customerInfo) {
    customerInfo.vatpercent = "10";
    var tmp;
    var geth = new Date();
    tmp =
      customerInfo.insymd +
      " " +
      geth.getHours() +
      ":" +
      geth.getMinutes() +
      ":" +
      geth.getSeconds();
    customerInfo.insymd = tmp;
    const request = new Request(API_URL + `/api/Admin/InsertStore`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }),
      body: JSON.stringify(customerInfo)
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
  static updateCustomer(customerInfo) {
    customerInfo.vatpercent = "10";
    const request = new Request(API_URL + `/api/Admin/UpdateStore`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }),
      body: JSON.stringify(customerInfo)
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

  static storeInfo(customerInfo) {
    const request = new Request(
      API_URL + `/api/Store/StoreInfo/` + customerInfo,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json"
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
export default customerApi;
