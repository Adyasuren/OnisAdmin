import { API_URL_NEW } from "../../../package.json";

class ShopUpdateApi {

  static GetAllUpdateList(body) {
    const request = new Request(API_URL_NEW + `api/update/list`, {
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

  static AddNewUpdate(body, data) {
	const request = new Request(API_URL_NEW + `/api/update/add?UIVERSION=${data.uiversion}&APIVERSION=${data.apiversion}&TYPE=${data.type}&NAME=${data.name}&MIGRATE=${data.migrate}`, {
		method: "POST",
		headers: {
		  Accept: "application/json, text/plain, */*",
		  "Access-Control-Allow-Headers": "*",
		},
		body: body,
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

export default ShopUpdateApi;
