import axios, { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from "axios";
import { BASE_API, BASE_URL } from "../config/config";

/** common options used for all clients */
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

  public async get<TResponse>(url: string, config?: AxiosRequestConfig<any>) {
    if (!this.csrfToken) {
      await this.getCsrfToken();
    }
    return this.axiosInstance.get<TResponse>(url, config);
  }

  public async post<TResponse>(url: string, data?: any, config?: AxiosRequestConfig<any>) {
    if (!this.csrfToken) {
      await this.getCsrfToken();
    }
    return this.axiosInstance.post<TResponse>(url, data, config);
  }

  public async put<TResponse>(url: string, data?: any, config?: AxiosRequestConfig<any>) {
    if (!this.csrfToken) {
      await this.getCsrfToken();
    }
    return this.axiosInstance.put<TResponse>(url, data, config);
  }

  public async patch<TResponse>(url: string, data?: any, config?: AxiosRequestConfig<any>) {
    if (!this.csrfToken) {
      await this.getCsrfToken();
    }
    return this.axiosInstance.patch<TResponse>(url, data, config);
  }

  public async delete<TResponse>(url: string, config?: AxiosRequestConfig<any>) {
    if (!this.csrfToken) {
      await this.getCsrfToken();
    }
    return this.axiosInstance.delete<TResponse>(url, config);
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

/**
 * Auth endpoints don't have v1/ prefix
 * ex. /login /register
 */
export const authClient = new AxiosClient(BASE_URL);

/**
 * API endpoints have version prefix
 * ex: /v1/tierlist/recent
 */
export const apiClient = new AxiosClient(BASE_API);
