import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import router from '@/router';
import myMessage from '@/utils/myMessage';
import store from "@/store";
import { clearToken } from "@/utils/auth";

const toLogin = () => {
  clearToken();
  router.replace({
    path: '/login',
    query: { redirect: router.currentRoute.fullPath || '' }
  });
}

const successTip = (msg: string) => {
  myMessage.success({
    showClose: true,
    message: msg,
    duration: 1500
  })
}

const errorTip = (msg: string) => {
  myMessage.error({
    showClose: true,
    message: msg,
    duration: 1500
  })
}

// const url = process.env.NODE_ENV === "production" ? 'http://47.103.108.152:8886' : '/';
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: "/",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});

// http request 拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    // if(process.env.NODE_ENV === "production"){ // 生产环境下所有的接口不带 "/api", 拦截的时候去掉
    //   console.log("生产环境", config);
    //   config.url = config.url?.replace("/api", "");
    // }
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (store.getters.getTokenValue) {
      config!.headers!.Authorization = store.getters.getTokenValue;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// http response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200 && response.data.code === 200) {
      // myMessage.success(response.data.msg);
      return Promise.resolve(response);
    } else {
      const {code, msg} = response.data;
      console.log(code, msg, 111111);
      if (code == 401) {
        errorTip("登录状态已过期，请重新登录");
        toLogin();
      } else if (code == 0 || code == 1 || code == 110 || code == 101 || code == 403 || code == 500) {
        errorTip(msg);
        return Promise.reject(response);
      }else{
        return response.data;
      }
    }
  },
  (error: any) => {
    const status = error.response.status;
    if (status) {
      switch (status) {
        case 400:
          errorTip("错误请求");
          break;
        case 401:
          toLogin();
          errorTip("登录状态已过期，请重新登录");
          break;
        case 403:
          errorTip("拒绝访问");
          break;
        case 404:
          errorTip("请求错误，未找到该资源");
          break;
        case 405:
          errorTip("请求方法未允许");
          break;
        case 408:
          errorTip("请求超时");
          break;
        case 500:
          errorTip("服务器端出错");
          break;
        case 502:
          errorTip("网络错误");
          break;
        case 504:
          errorTip("网络超时");
          break;
        default:
          errorTip("未知错误");
      }
    }
  }
);
export function get(url:any, params:any) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post(url:any, params:any) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
export default service;
