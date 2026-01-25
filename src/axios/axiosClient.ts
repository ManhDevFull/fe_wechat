import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios'
import queryString from 'query-string'
import { restApiBase } from '../utils/env'
import { useAuthStore } from '../stores/auth.store'
const baseURL = restApiBase

const getToken = () => {
  if (typeof window === 'undefined') return ''
  return window.localStorage.getItem('token') ?? ''
}

let refreshPromise: Promise<string | null> | null = null

export const refreshToken = async (): Promise<string | null> => {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${baseURL}/auth/refresh-token`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        const token = res.data?.data?.accessToken
        if (!token) return null

        useAuthStore.getState().setToken(token)
        return token
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}
const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
  paramsSerializer: (params) => queryString.stringify(params),
})

/* ===================== REQUEST ===================== */
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const headers = AxiosHeaders.from(config.headers ?? {})
  const token = useAuthStore.getState().token

  headers.set('Accept', 'application/json')
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  config.headers = headers
  return config
})

/* ===================== RESPONSE ===================== */
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status
    const originalRequest = error?.config

    if (status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true
      try {
        const newToken = await refreshToken()
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return axiosClient(originalRequest)
        }
      } catch {
        return Promise.reject(error)
      }
    }

    return Promise.reject(error?.response?.data || error)
  }
)

export default axiosClient
