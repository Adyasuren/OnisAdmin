import { API_URL_NEW, key } from "../../../package.json";

class ShopPaymentApi {

  static GetPaymentList(body) {
    body.key = key;
    const request = new Request(API_URL_NEW + `/api/license/paylist`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
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

  static EditPayment(body) {
    body.KEY = key;
    const request = new Request(API_URL_NEW + `/api/license/payedit`, {
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

export default ShopPaymentApi;
