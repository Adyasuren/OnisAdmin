import { API_URL_NEW} from "../../package.json";
class     UpdatePopUpApi
{
  static UpdatePopUp(id) {
		const request = new Request(API_URL_NEW + `/api/update/popup/${id}`, {
			method: 'GET',
			headers: new Headers({
				Accept: 'application/json, text/plain, */*',
				"Content-Type": "application/json",
				'Access-Control-Allow-Headers': '*',
      }),
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
}

export default UpdatePopUpApi
;
