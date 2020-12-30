import { API_URL_NEW } from "../../../package.json";

class ShopBannerApi {

  static async AddBanner(body, data) {
    const request = new Request(API_URL_NEW + `api/banner?BANNERNM=${data.bannernm}&STARTYMD=${data.startymd}&ENDYMD=${data.endymd}&INSBY=${data.insby}`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Access-Control-Allow-Headers": "*",
      },
      body: body,
    });

    try {
      const response = await fetch(request);
      if (response.status >= 400 && response.status < 600) {
        return response.text().then(text => {
          return Promise.reject(text);
        });
      }
      return await response.json();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  static async GetAllBanner(body) {
    const request = new Request(API_URL_NEW + `api/banner/list`, {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    	body: JSON.stringify(body),
    });

    try {
      const response = await fetch(request);
      if (response.status >= 400 && response.status < 600) {
        return response.text().then(text => {
          return Promise.reject(text);
        });
      }
      return await response.json();
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  static async DisableBanner (id, updby){
    const request = new Request(API_URL_NEW + `api/banner/${id}/${updby}`, 
    {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json, text/plain, */*",
        "Access-Control-Allow-Headers": "*",
      }),
    });
    try {
      const response = await fetch(request);
      if (response.status >= 400 && response.status < 600) {
        return response.text().then(text => {
          return Promise.reject(text);
        });
      }
      return await response.json();
    } catch (error) {
      return await Promise.reject(error);
    }
  }
  
}

export default ShopBannerApi;
