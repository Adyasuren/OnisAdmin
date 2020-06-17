import { API_URL } from '../../package.json';
class Api {
	/* DESKTOP STORE */

	static deskcheckregnum(value) {
		const request = new Request(API_URL + `/api/Admin/DeskCheckRegnum/` + value, {
			method: 'PUT',
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt")
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

	static getDeskStore(credentials) {
		const request = new Request(API_URL + `/api/Desktop/store/getall`, {
			method: 'PUT',
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt")
			}),
			body: JSON.stringify(credentials)
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

	static addDeskStore(temp) {
		const request = new Request(API_URL + `/api/Desktop/store`, {
			method: 'POST',
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt")
			}),
			body: JSON.stringify(temp)
		});
		return fetch(request)
			.then((response) => {
				console.log('res');
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

	static editDesktopStore(storeid, temp) {
		const request = new Request(API_URL + `/api/Desktop/store/` + storeid, {
			method: 'PUT',
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt")
			}),
			body: JSON.stringify(temp)
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

	/* DESKTOP BRANCH */

	static editDesktopBranch(branchid, temp) {
		const request = new Request(API_URL + `/api/Desktop/branch/` + branchid, {
			method: 'PUT',
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt")
			}),
			body: JSON.stringify(temp)
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

	static getBranch(temp) {
		const request = new Request(API_URL + `/api/Desktop/branch/getall`, {
			method: 'PUT',
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt")
			}),
			body: JSON.stringify(temp)
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

	static addDeskBranch(temp) {
		const request = new Request(API_URL + `/api/Desktop/branch`, {
			method: 'POST',
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt")
			}),
			body: JSON.stringify(temp)
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

	/* DESKTOP PAYMENT */
	static editDesktopPayment(paymentid, temp) {
		const request = new Request(API_URL + `/api/Desktop/payment/` + paymentid, {
			method: 'PUT',
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt")
			}),
			body: JSON.stringify(temp)
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

	static getPayment(temp) {
		const request = new Request(API_URL + `/api/Desktop/payment/getall`, {
			method: 'PUT',
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt")
			}),
			body: JSON.stringify(temp)
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

	static getPaymentData(paymentid, temp) {
		const request = new Request(API_URL + `/api/Desktop/payment` + paymentid, {
			method: 'PUT',
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt")
			}),
			body: JSON.stringify(temp)
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

	static addDesktopPayment(temp) {
		const request = new Request(API_URL + `/api/Desktop/payment`, {
			method: 'POST',
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("jwt")
			}),
			body: JSON.stringify(temp)
		});
		return fetch(request)
			.then((response) => {
				console.log(response);
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

export default Api;
