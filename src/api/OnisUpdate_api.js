import { API_URL_NEW} from "../../package.json";
class OnisUpdateApi {
  static getDistrictUpdate(credentials) {
		const request = new Request(API_URL_NEW + `/api/update/list`, {
			method: 'POST',
			headers: new Headers({
				Accept: 'application/json, text/plain, */*',
				"Content-Type": "application/json",
				'Access-Control-Allow-Headers': '*',
      }),
      body: JSON.stringify(credentials),
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
      .then( res => {
        return Promise.resolve(res);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}

export default OnisUpdateApi;
