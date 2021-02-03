import { API_URL_NEW, key } from "../../../package.json";

class NonVatPruductApi {

  static GetProducts(body) {
    const request = new Request(API_URL_NEW + `/api/product/list`, {
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

  static AddProduct(body) {
    body.key = key;
    const request = new Request(API_URL_NEW + `/api/product`, {
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

  static CheckProduct(regno, barcode, name) {
    const request = new Request(API_URL_NEW + `/api/product/check/${regno}/${barcode}/${name}/${key}`, {
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
}

export default NonVatPruductApi;
