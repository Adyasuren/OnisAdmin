import { API_URL_NEW } from "../../package.json";

class OnisUserListApi {
  
	
  static onisUser(credentials) {
		const request = new Request(API_URL_NEW + `/api/store`, {
			method: 'POST',
			headers: new Headers({
				Accept: 'application/json, text/plain, */*',
				"Content-Type": "application/json",
				'Access-Control-Allow-Headers': '*',
				// Authorization: "Bearer " + localStorage.getItem("jwt")
      }),
      body: JSON.stringify(credentials),
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
export default OnisUserListApi;
