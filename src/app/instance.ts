import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import Cookies from "js-cookie";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

interface RefreshResponse {
  accessToken: string;
}

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = Cookies.get("accessToken");

    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAuthLogic = async (failedRequest: AxiosError) => {
  try {
    const refreshToken = Cookies.get("refreshToken");
    const tokenRefreshResponse: AxiosResponse<RefreshResponse> =
      await instance.post("/auth/refresh", { refreshToken });
    Cookies.set("accessToken", tokenRefreshResponse.data.accessToken);
    failedRequest.response!.config.headers["Authorization"] =
      "Bearer " + tokenRefreshResponse.data.accessToken;
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

createAuthRefreshInterceptor(instance, refreshAuthLogic);
