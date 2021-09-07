import { API_URL_NEW, key } from "../../../package.json";

class LicenseApi {
  static GetAllWindowList() {
    const request = new Request(API_URL_NEW + `/api/license/licensedmenu`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
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

  static AddMaster(body) {
    const request = new Request(API_URL_NEW + `/api/license/master`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
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

  static GetAllMasterList() {
    const request = new Request(
      API_URL_NEW + `/api/license/master/list/${key}`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );

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

  static GetGroupedMasterList(regno) {
    const request = new Request(
      API_URL_NEW + `/api/license/master/group/${key}?regno=${regno}`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );

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

  static GetAllLisenceList(body) {
    const request = new Request(API_URL_NEW + `/api/license/list`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
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

  static GetAllLisenceModule(body) {
    const request = new Request(API_URL_NEW + `/api/license/modul`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
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

  static AddLicense(body) {
    const request = new Request(API_URL_NEW + `/api/license`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
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

  static GetLicenseWindows(id) {
    const request = new Request(
      API_URL_NEW + `/api/license/invoicemenu/${id}`,
      {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );

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

  static GetInvoices(regno) {
    const request = new Request(
      API_URL_NEW + `/api/license/invoices/${key}/${regno}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );

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

  static InvoiceTune(invoiceno, statementid) {
    const request = new Request(
      API_URL_NEW +
        `/api/license/invoiceamount/${key}/${invoiceno}/${statementid}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );

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

export default LicenseApi;
