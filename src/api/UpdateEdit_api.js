import { API_URL_NEW} from "../../package.json";
class UpdateEditApi {
  static updateEdit(credentials) {
		const request = new Request(API_URL_NEW + `/api/update/add`, {
			method: 'POST',
			headers: new Headers({
				Accept: 'multipart/form-data, text/plain, */*',
				"Content-Type": "multipart/form-data",
				'Access-Control-Allow-Headers': '*',
      }),
      body: credentials,
		});

    return fetch(request)
      .then(response => {
        if (response.status >= 400 && response.status < 610) {
          return response.text().then(text => {
            return Promise.reject(text);
          });
        }
        return response.json();
      })
      .then( res => {
        return Promise.resolve(res);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }


static regPosApi(body, data) {
  const request = new Request(API_URL_NEW + `/api/update/add?UIVERSION=${data.UIVERSION}&APIVERSION=${data.APIVERSION}&TYPE=${data.TYPE}&NAME=${data.NAME}&MIGRATE=${data.MIGRATE}`, {
    method: "POST",
    headers: new Headers({
      Accept: "application/json, text/plain, */*",
      "Access-Control-Allow-Headers": "*",
    }),
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

export default UpdateEditApi;
