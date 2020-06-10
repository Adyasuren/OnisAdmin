import { API_URL } from '../../package.json';

class checkregnumApi {
	static checkregnum(value) {
		const request = new Request(API_URL + `/api/Admin/CheckRegnum/` + value, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
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

export default checkregnumApi;
