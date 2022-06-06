import { ILoginParams } from '@/api/user/userModel';
import { clearSession, getToken } from '@/untils/auth';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus';
import qs from 'qs'

export interface IResult<T> {
  code: number,
  msg: string,
  data: T
}

enum StatusCode {
  NoAuth = 600,
  Success = 200,
}

let handleErrorMsg = (msg: string) => {
  ElMessage.error(msg)
}

class Request {
  private instance: AxiosInstance; //axios实例
  // 构造函数  给instance进行初始化
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    // 拦截器配置
    this.interceptors();
  }
  // 拦截器
  private interceptors() {
    // 请求发送之前的拦截
    // 请求发送之前添加token
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      let token = getToken();
      if (token) {
        config.headers = {
          ...config.headers,
          token
        }
      }
      return config;
    }, (error: any) => {
      // 错误抛到业务代码
      error.data = {}
      error.data.msg = '服务器异常，请联系管理员!'
      return error;
    })

    //请求返回之后的拦截
    this.instance.interceptors.response.use((res: AxiosResponse) => {
      if (res && res.data) {
        const data = res.data;
        // 后端接口会返回一些状态，code是根据后端定义的字段来对应
        console.log(res,'res')
        if (data.code == StatusCode.NoAuth) {
          // token过期/无权限，跳转到登录接口   
          // 跳转到登录页面
          window.location.href = '/login';
          // 清空本地缓存
          clearSession();
          ElMessage.error(data.msg)
        } else if (data.code == StatusCode.Success || res.config.responseType == 'arraybuffer') {
          // 成功
          return res;
        } else {
          ElMessage.error(data.msg || '服务器出错！')
          return res || null;
        }
      }
    }, (error: any) => {
      console.error('response错误')
      if (error && error.response) {
        error.data = {};
        switch (error.response.status) {
          case 400:
            error.data.msg = '错误请求';
            // ElMessage.error(error.data.msg)
            handleErrorMsg(error.data.msg)
            break;
          case 401:
            error.data.msg = '未授权，请重新登录';
            handleErrorMsg(error.data.msg)
            break;
          case 403:
            error.data.msg = '拒绝访问';
            handleErrorMsg(error.data.msg)
            break;
          case 404:
            error.data.msg = '请求错误,未找到该资源';
            handleErrorMsg(error.data.msg)
            break;
          case 405:
            error.data.msg = '请求方法未允许';
            handleErrorMsg(error.data.msg)
            break;
          case 408:
            error.data.msg = '请求超时';
            handleErrorMsg(error.data.msg)
            break;
          default:
            error.data.msg = `连接错误${error.response.status}`;
            ElMessage.error(error.data.msg)
        }
      }
    })
  }

  // 参数处理
  getParams(params: any) {
    let _params = ''
    if (Object.is(params, null || undefined)) {
      return _params;
    } else {
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key) && params[key]) {
          _params += `/${params[key]}`
        }
      }
      if (_params) return _params.substr(0, _params.length)
    }
  }
  // http://localhost:8080/api/getUserById?UserId=10
  // { userId: 10} 参数
  get<T = any>(url: string, params?: any): Promise<IResult<T>> {
    return new Promise((resolve, reject) => {
      this.instance.get<T>(url, {
        params,
        paramsSerializer: (params) => qs.stringify(params)
      })
        .then(res => {
          resolve(res.data as any)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  // http://localhost:8080/api/getUserById/10/test  restful API
  // { userId:10, userName: 'test'}
  getRestApi<T = any>(url: string, params?: any): Promise<IResult<T>> {
    return new Promise((resolve, reject) => {
      this.instance.get<T>(this.getParams(params) ? `${url}${this.getParams(params)}` : url)
        .then(res => {
          resolve(res.data as any)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  //post请求
  post<T = any>(url: string, params?: any): Promise<IResult<T>> {
    return new Promise((resolve, reject) => {
      this.instance.post<T>(url, params, {
        transformRequest: [params => JSON.stringify(params)],
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          resolve(res.data as any)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  // put请求
  put<T = any>(url: string, params?: any): Promise<IResult<T>> {
    return new Promise((resolve, reject) => {
      this.instance.put<T>(url, params, {
        transformRequest: [params => JSON.stringify(params)],
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          resolve(res.data as any)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  //delete请求
  // http://localhost:8080/api/deleteById/10  restful API
  // { userId:10}
  delete<T = any>(url: string, params?: any): Promise<IResult<T>> {
    return new Promise((resolve, reject) => {
      this.instance.delete<T>(this.getParams(params) ? `${url}${this.getParams(params)}` : url)
        .then(res => {
          resolve(res.data as any)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  // 获取图片请求
  getImage(url: string){
    return this.instance.post(url,null,{
      responseType: 'arraybuffer'
    })
  }
  // 登录接口
  login<T = any>(url: string,params: ILoginParams): Promise<IResult<T>>{
    return new Promise((resolve,reject) => {
      this.instance.post<T>(url,params,{
        transformRequest: [(params) => qs.stringify(params)],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        resolve(res as any)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default Request;