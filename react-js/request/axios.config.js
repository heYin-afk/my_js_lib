import axios from "axios"
//import Axios from "axios";

// 开发环境默认配置
let _serverIp = 'http://test.shared123.cn';
//let _port = '10001';
let _baseURL = 'http://test.shared123.cn'//`${_serverIp}:${_port}`;
let _mockURL = 'http://test.shared123.cn';

/* 
 *  判断运行环境
 */
switch (process.env.NODE_ENV) {
  case "production":
    axios.defaults.baseURL = _serverIp;
    break;
  case "test":
    axios.defaults.baseURL = _mockURL;
    break;
  default:
    axios.defaults.baseURL = _baseURL;
}
/* 
 *  设置超时时间和跨域是否允许携带凭证 
 */
axios.defaults.timeout = 10000; //超时时间
//axios.defaults.withCredentials  = false; //是否携带凭证
/* 
 *  设置请求传递数据的格式
 */
axios.defaults.headers['Content-Type'] = "application/json;charset=utf-8" // || 'application/x-www-form-urlencoded';
//axios.defaults.transformRequest = data => JSON.stringify(data);
//4post请求头的设置
axios.defaults.headers.post['Content-Type'] = "application/json;charset=utf-8" //'application/x-www-form-urlencoded;charset=UTF-8'

/* 
 *  请求拦截
 */
axios.interceptors.request.use( config => {
  let token = sessionStorage.getItem("token") || localStorage.getItem("token") ;
  token && (config.headers.Authorization = token);
  return config;
}, error => {
  return Promise.reject(error);
})

/* 
 *  响应拦截
*/

axios.interceptors.response.use( 
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {            
      return Promise.resolve(response);        
    } else {            
      return Promise.reject(response);        
    }    
  },    
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {            
    if (error.response.status) {            
    /*   switch (error.response.status) {                
          // 401: 未登录
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。                
          case 401:                    
              router.replace({                        
                  path: '/login',                        
                  query: { 
                      redirect: router.currentRoute.fullPath 
                  }
              });
              break;

          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面                
          case 403:
                Toast({
                  message: '登录过期，请重新登录',
                  duration: 1000,
                  forbidClick: true
              });
              // 清除token
              localStorage.removeItem('token');
              store.commit('loginSuccess', null);
              // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
              setTimeout(() => {                        
                  router.replace({                            
                      path: '/login',                            
                      query: { 
                          redirect: router.currentRoute.fullPath 
                      }                        
                  });                    
              }, 1000);                    
              break; 

          // 404请求不存在
          case 404:
              Toast({
                  message: '网络请求不存在',
                  duration: 1500,
                  forbidClick: true
              });
              break;
          // 其他错误，直接抛出错误提示
          default:
              Toast({
                  message: error.response.data.message,
                  duration: 1500,
                  forbidClick: true
              });
      }*/ 
      return Promise.reject(error.response);
    }
  }    
);


const get = (url, option) =>    
  new Promise((resolve, reject) =>        
    axios.get(url, option)
    .then(res => resolve(res.data))
    .catch(err => reject(err.data))
  )

const post = (url, option) => 
  new Promise((resolve, reject) => 
    axios.post(url,option)
    .then(res =>resolve(res.data))
    .catch(err => reject(err.data))
  )

export  {
  axios,
  get,
  post
} 
