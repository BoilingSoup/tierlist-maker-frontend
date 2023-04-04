import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { BASE_API, BASE_URL } from "../config/config";

const axiosOpts = (baseURL: string): CreateAxiosDefaults => ({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/**
 * AxiosClient class is a customized class that will check for the existence of a CSRF cookie before every get, post, put, patch, delete request.
 * If the CSRF cookie doesn't exist, one will be fetched before proceding with the initial request.
 */
class AxiosClient {
  private axiosInstance: AxiosInstance;
  private csrfClient: AxiosInstance;
  private csrfCookieName = "XSRF-TOKEN";
  private csrfCookieRoute = `${BASE_URL}/sanctum/csrf-cookie`;

  public constructor(baseUrl: string) {
    this.axiosInstance = axios.create(axiosOpts(baseUrl));
    this.csrfClient = axios.create(axiosOpts(BASE_URL));
  }

  public async get<ResponseType>(url: string) {
    if (!this.csrfToken) {
      await this.getCsrfToken();
    }
    return this.axiosInstance.get<ResponseType>(url);
  }

  public async post<ResponseType>(url: string, data: any) {
    if (!this.csrfToken) {
      await this.getCsrfToken();
    }
    return this.axiosInstance.post<ResponseType>(url, data);
  }

  public async put<ResponseType>(url: string, data: any) {
    if (!this.csrfToken) {
      await this.getCsrfToken();
    }
    return this.axiosInstance.put<ResponseType>(url, data);
  }

  public async patch<ResponseType>(url: string, data: any) {
    if (!this.csrfToken) {
      await this.getCsrfToken();
    }
    return this.axiosInstance.patch<ResponseType>(url, data);
  }

  public async delete<ResponseType>(url: string, data: any) {
    if (!this.csrfToken) {
      await this.getCsrfToken();
    }
    return this.axiosInstance.patch<ResponseType>(url, data);
  }

  private get csrfToken() {
    let cookie: Record<string, string> = {};

    document.cookie.split(";").forEach(function (el) {
      let [k, v] = el.split("=");
      cookie[k.trim()] = v;
    });

    return cookie[this.csrfCookieName];
  }

  private async getCsrfToken() {
    await this.csrfClient.get(this.csrfCookieRoute);
  }
}

export const authClient = new AxiosClient(BASE_URL);
export const apiClient = new AxiosClient(BASE_API);
