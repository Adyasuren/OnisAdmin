class companyApi {
  static getCompanies() {
    const request = new Request(`/api/v1/user/companyid/1`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      })
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

  static insertCompany() {
    const request = new Request(`/api/values`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
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

export default userApi;
