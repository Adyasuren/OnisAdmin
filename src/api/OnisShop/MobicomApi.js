import { API_URL_NEW } from "../../../package.json";
const key = "8a0adf16d8278e247f71f985c741d661";
class MobicomApi {

	static GetMobicomBalance() {
		const request = new Request(API_URL_NEW + `api/mobicom/dcbalance/${key}`, {
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

  
  static GetAllDillerList(body) {
    const request = new Request(API_URL_NEW + `api/mobicom/list`, {
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

  static EditDiller(body) {
    const request = new Request(API_URL_NEW + `api/mobicom/accept/${key}`, {
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


  static GetAllDillerPaymentList(body) {
	body.key = key;
    const request = new Request(API_URL_NEW + `api/mobicom/payment`, {
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

  static GetAllDillerSaleList(body) {
	body.key = key;
    const request = new Request(API_URL_NEW + `api/mobicom/salelist`, {
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

export default MobicomApi;
