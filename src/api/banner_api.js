import { API_URL_NEW } from "../../package.json";

class bannerApi {
  static insertBanners(body, data) {
    const request = new Request(API_URL_NEW + `api/banner?BANNERNM=${data.bannerNm}&STARTYMD=${data.startDate}&ENDYMD=${data.endDate}`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Access-Control-Allow-Headers": "*",
      },
      body: body,
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

  static bannerList (bannerList){
    const request = new Request(API_URL_NEW + `api/banner/list`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
          "Access-Control-Allow-Headers": "*",
        }),
        credentials: "include",
        body: JSON.stringify(bannerList)
      })

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
  };
  static updateBanners (id, updby){
    // bannerList.vatpercent = "10";
    const request = new Request(API_URL_NEW + `api/banner/${id}/${updby}`, 
    {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json, text/plain, */*",
        "Access-Control-Allow-Headers": "*",
        // Authorization: "Bearer " + localStorage.getItem("jwt")
      }),
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
/* 
class update {
  static updateBanners (bannerList){
    bannerList.vatpercent = "10";
    const request = new Request(API_URL_NEW + `api/banner/{id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }),
      body: JSON.stringify(bannerList)
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
};
  class bannerList {
    static bannerList (bannerList){
      const request = new Request(
        API_URL_NEW + `api/banner`,
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(bannerList)
        }
      )
    
    
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
    };
  } */

export default bannerApi;
