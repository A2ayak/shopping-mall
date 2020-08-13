import axios from 'axios'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    // baseURL: 'http://106.54.54.237:8000/api/v1',
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  })
  //2.axios的拦截器
  instance.interceptors.request.use(config => {
    return config
  },err => {
    // console.log(err);
  })
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })
  return instance(config)
}
