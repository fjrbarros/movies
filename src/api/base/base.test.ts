import { API_BASE_URL } from "@constants";
import { ApiService } from "./base";

const baseUrlMock = "https://api.exemplo.com/";
const method = "GET";
const headers = {
  "Content-Type": "application/json",
};

globalThis.fetch = jest.fn();

describe("ApiService", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("should use the provided baseUrl", async () => {
    const customBaseUrl = "https://custom.api.com/";
    const customApiService = new ApiService(customBaseUrl);

    const mockData = { data: "test" };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    await customApiService.get<typeof mockData>();

    expect(fetch).toHaveBeenCalledWith(customBaseUrl, { method, headers });
  });

  it("should use the default baseUrl if none is provided", async () => {
    const defaultApiService = new ApiService();

    const mockData = { data: "test" };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const config = {
      endpoint: "/data",
      params: { filter: "active" },
    };
    await defaultApiService.get<typeof mockData>(config);

    expect(fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}${config.endpoint}?filter=active`,
      { method, headers },
    );
  });

  it("should make a GET request and return data", async () => {
    const apiService = new ApiService(baseUrlMock);

    const mockData = { data: "test" };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const config = {
      endpoint: "/data",
      params: { filter: "active" },
    };
    const data = await apiService.get<typeof mockData>(config);

    expect(fetch).toHaveBeenCalledWith(
      `${baseUrlMock}${config.endpoint}?filter=active`,
      { method, headers },
    );
    expect(data).toEqual(mockData);
  });

  it("should throw an error if the response is not ok", async () => {
    const apiService = new ApiService(baseUrlMock);

    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
    });

    const config = {
      endpoint: "/data",
      params: { filter: "active" },
    };

    await expect(apiService.get<unknown>(config)).rejects.toThrow("Error: 404");
  });

  it("should handle empty parameters", async () => {
    const apiService = new ApiService(baseUrlMock);

    const mockData = { data: "test" };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const config = {
      endpoint: "/data",
    };
    const data = await apiService.get<typeof mockData>(config);

    expect(fetch).toHaveBeenCalledWith(`${baseUrlMock}${config.endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    });
    expect(data).toEqual(mockData);
  });

  it("should handle multiple parameters", async () => {
    const apiService = new ApiService(baseUrlMock);

    const mockData = { data: "test" };
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const config = {
      endpoint: "/data",
      params: { filter: "active", page: "1", order: "asc" },
    };
    const data = await apiService.get<typeof mockData>(config);

    expect(fetch).toHaveBeenCalledWith(
      `${baseUrlMock}${config.endpoint}?filter=active&page=1&order=asc`,
      { method, headers },
    );
    expect(data).toEqual(mockData);
  });
});
