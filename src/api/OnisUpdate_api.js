import { API_URL_NEW} from "../../package.json";
class     OnisUpdateApi
{
  static onisUpdateApi() {
		const request = new Request(API_URL_NEW + `/api/store`, {
			method: 'POST',
			headers: {
				Accept: 'application/json, text/plain, */*',
				"Content-Type": "application/json",
				'Access-Control-Allow-Headers': '*',
            },
        });
    

    return fetch(request)
      .then(response => {
          console.log(response)
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
  static getDistrictUpdate(params) {
		const request = new Request(API_URL_NEW + `api/update/list`, {
			method: 'POST',
			headers: {
				Accept: 'application/json, text/plain, */*',
				"Content-Type": "application/json",
				'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(params)
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

export default OnisUpdateApi
;
