import { API_URL_NEW} from "../../package.json";
class OnisUserApi
{
  static userList(body) {
		const request = new Request(API_URL_NEW + `/api/store`, {
			method: 'POST',
			headers: new Headers({
                "Content-Type": "application/json",
                Accept: 'application/json, text/plain, */*',
				"Access-Control-Allow-Headers": "*",
            }),
            body: JSON.stringify(body)
		});

    return fetch(request)
      .then((response) => {
          console.log(response)
        if (response.status >= 400 && response.status < 600) {
          return response.text().then(text => {
            return Promise.reject(text);
          })
        }
        return response.json();
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export default OnisUserApi
;
