import axiosClient from './axiosClient'
import { AxiosRequestConfig } from 'axios'

type Method = 'get' | 'post' | 'put' | 'delete'

export const handleAPI = async <T = any>(
  url: string,
  {
    method = 'get',
    data,
    params,
    config,
  }: {
    method?: Method
    data?: any
    params?: any
    config?: AxiosRequestConfig
  } = {}
): Promise<T> => {
  const res = await axiosClient({
    url,
    method,
    data,
    params,
    ...config,
  })

  return res.data as T
}


export const apiAll = <T = any>(requests: Promise<T>[]) => {
  return Promise.all(requests)
}

export const apiAllSettled = <T = any>(requests: Promise<T>[]) => {
  return Promise.allSettled(requests)
}
