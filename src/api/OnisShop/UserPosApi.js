import { API_URL_NEW, key } from "../../../package.json";

class UserPosApi {
    
  static GetAllPosApiList(body) {
    const request = new Request(API_URL_NEW + `/api/posapi/${key}`, {
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

  static RegisterPosApi(body, data) {
    const request = new Request(
      API_URL_NEW + `/api/posapi/${data.regno}/${data.insby}/${data.type}/${key}?posno=${data.posno}`,
      {
        method: "POST",
        headers: new Headers({
          Accept: "application/json, text/plain, */*",
          "Access-Control-Allow-Headers": "*",
        }),
        body: body,
      }
    );

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

export default UserPosApi;
