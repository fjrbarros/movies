import { API_BASE_URL } from "@constants";
import type { GetRequestConfig } from "./base.types";

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private buildQueryString(params: Record<string, string>): string {
    const queryString = new URLSearchParams(params).toString();
    return queryString ? `?${queryString}` : "";
  }

  async get<T>(config: GetRequestConfig = {}): Promise<T> {
    const { endpoint = "", params = {} } = config;
    const queryString = this.buildQueryString(params);
    const url = `${this.baseUrl}${endpoint}${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();
  }
}
