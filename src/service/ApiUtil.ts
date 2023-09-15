import Axios, { AxiosResponse } from "axios";

export class ApiUtil {
  private static SERVICE_URL = String(process.env.REACT_APP_SERVICE_URL);

  /**
   * @description Type parameter T - payload type, K - return type
   * @param url
   * @param payload
   * @returns api response of type K
   */
  public static async post<T, K>(url: string, payload?: T): Promise<K> {
    const apiUrl = `${this.SERVICE_URL}${url}`;
    const results: AxiosResponse<K> = await Axios.post(apiUrl, payload);
    return results.data;
  }

  public static async get<T>(url: string): Promise<T> {
    const apiUrl = `${this.SERVICE_URL}${url}`;
    const results: AxiosResponse<T> = await Axios.get(apiUrl);
    return results.data;
  }

  public static async update<T, K>(url: string, payload?: T): Promise<K> {
    const apiUrl = `${this.SERVICE_URL}${url}`;
    const results: AxiosResponse<K> = await Axios.put(apiUrl, payload);
    return results.data;
  }

  public static async delete<T>(url: string): Promise<T> {
    const apiUrl = `${this.SERVICE_URL}${url}`;
    const results: AxiosResponse<T> = await Axios.delete(apiUrl);
    return results.data;
  }
}
