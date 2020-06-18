import axios from "axios";

axios.interceptors.response.use( response => {
  if (response.data.errcode && response.data.errcode > 0)
    return Promise.reject(response.data.errmsg)
  return response.data;
}, error => {
  return error
})

export const get = (url: string, param?: object): any => {
  return axios.get(url, param)
} 

export const post = (url: string, data?: object | string, param?: object): any => {
  return axios.post(url, data, param)
} 