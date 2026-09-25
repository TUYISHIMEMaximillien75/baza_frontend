import axios, { AxiosRequestConfig } from 'axios';
import { config } from '../config';

export const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// ─── Request Interceptor — attach Bearer token ────────────────────────────────
apiClient.interceptors.request.use((request) => {
  // Dynamically read from localStorage to always get the latest token
  try {
    const raw = localStorage.getItem('baza-session');
    if (raw) {
      const session = JSON.parse(raw);
      const token = session?.state?.accessToken;
      if (token) {
        request.headers = request.headers ?? {};
        request.headers['Authorization'] = `Bearer ${token}`;
      }
    }
  } catch {
    // ignore parse errors
  }
  return request;
});

// ─── Response Interceptor — handle 401 with token refresh ─────────────────────
let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

const processQueue = (token: string) => {
  refreshQueue.forEach((resolve) => resolve(token));
  refreshQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue requests while a refresh is in flight
        return new Promise<string>((resolve) => {
          refreshQueue.push(resolve);
        }).then((newToken) => {
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          }
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const raw = localStorage.getItem('baza-session');
        const session = raw ? JSON.parse(raw) : null;
        const refreshToken = session?.state?.refreshToken;

        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(`${config.apiBaseUrl}/auth/refresh`, { refreshToken });
        const newAccessToken: string = data?.data?.accessToken;

        // Update persisted store with new access token
        if (raw) {
          const parsed = JSON.parse(raw);
          parsed.state.accessToken = newAccessToken;
          localStorage.setItem('baza-session', JSON.stringify(parsed));
        }

        processQueue(newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }

        return apiClient(originalRequest);
      } catch {
        // Refresh failed — clear session and redirect to login
        localStorage.removeItem('baza-session');
        window.location.href = '/login';
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    // Standardize error format
    const formattedError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      statusCode: error.response?.status || 500,
      errors: error.response?.data?.errors || [],
    };
    return Promise.reject(formattedError);
  },
);
