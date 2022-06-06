import  Request from './request'

const http = new Request({
  baseURL: 'http://42.193.158.170:8098',
  timeout: 10000
})
export default http;
