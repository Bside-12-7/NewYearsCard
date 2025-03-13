import axios from "axios";
import { API_BASE_URL } from "../constants";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
});

// 요청 인터셉터 추가하기
apiClient.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행

    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const accessToken = sessionStorage.getItem("accessToken");
    console.log(accessToken, error.response.status);
    if (accessToken && error.response.status === 401) {
      console.log("!");
      sessionStorage.removeItem("accessToken");
      window.location.href = "/home";
    }
    return error;
  }
);

export { apiClient };
