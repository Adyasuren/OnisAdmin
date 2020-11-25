import { API_URL_NEW } from "../../../package.json";

class QpayApi {
  static AddQpaySettings(body) {
    const request = new Request(API_URL_NEW + `/api/dealer/qpay`, {
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

  static UpdateQpaySettings(body, id) {
    const request = new Request(API_URL_NEW + `api/dealer/qpay/${id}`, {
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

  static GetAllQpaySettings(body) {
    const request = new Request(API_URL_NEW + `/api/dealer/qpay/list`, {
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

  static DeleteQpaySettings (id){
    const request = new Request(API_URL_NEW + `api/dealer/qpay/${id}`, 
    {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json, text/plain, */*",
        "Access-Control-Allow-Headers": "*",
      }),
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

export default QpayApi;
