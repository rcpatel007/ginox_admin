import axios from 'axios';
import { DEV_URL } from '../api/url';
import { STORAGEKEY } from '../Constant';
export const Bearer = 'Bearer ';

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.clear();
      window.location.assign('/auth/login');
    } else {
      return Promise.reject(error);
    }
  }
);

export default {
  post: (url, paydata) => {
    return axios.post(DEV_URL + url, paydata);
  },

  postWithToken: (url, data) => {
    return axios({
      method: 'post',
      data: data,
      url: DEV_URL + url,
      headers: {
        authorization: Bearer + localStorage.getItem(STORAGEKEY.ACCESSTOKEN),
      },
    });
  },

  // postWithParams:(url,params)=>{
  //   return axios({
  //     method:"post",
  //     params,
  //     url:DEV_URL + url,
  //     headers:{
  //       authorization:
  //         Bearer + localStorage.getItem(STORAGEKEY.ACCESSTOKEN)
  //     }
  //   })
  // },

  get: (url) => {
    return axios.get(DEV_URL + url);
  },

  getWithToken: (url) => {
    return axios({
      method: 'get',
      url: DEV_URL + url,
      headers: {
        authorization: Bearer + localStorage.getItem(STORAGEKEY.ACCESSTOKEN),
      },
    });
  },

  getWithParams: (url, params) => {
    return axios({
      method: 'get',
      params,
      url: DEV_URL + url,
      headers: {
        authorization: Bearer + localStorage.getItem(STORAGEKEY.ACCESSTOKEN),
      },
    });
  },

  putWithToken: (url, data) => {
    return axios({
      method: 'put',
      data: data,
      url: DEV_URL + url,
      headers: {
        authorization: Bearer + localStorage.getItem(STORAGEKEY.ACCESSTOKEN),
      },
    });
  },

  delete: (url, paydata) => {
    return axios.delete(DEV_URL + url, paydata);
  },

  deleteWithToken: (url, params) => {
    return axios({
      method: 'delete',
      params,
      url: DEV_URL + url,
      headers: {
        authorization: Bearer + localStorage.getItem(STORAGEKEY.ACCESSTOKEN),
      },
    });
  },
};
