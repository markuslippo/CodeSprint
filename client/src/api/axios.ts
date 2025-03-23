import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
	baseURL: "http://localhost:8080",
	withCredentials: true,
});

let isRefreshing = false;

// An interceptor to try to refresh access token whenever a 401 error is received
api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry && !isRefreshing) {
			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const refreshRes = await api.get("/auth/refresh");
				if (refreshRes.status === 200) {
					isRefreshing = false;
					return api(originalRequest);
				}
			} catch (refreshError) {
				console.log("Refresh token failed");
			}
			isRefreshing = false;
		}
		return Promise.reject(error);
	}
);

export default api;
