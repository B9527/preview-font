import axios from 'axios';

let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
let config_2 = {
  headers:{
    "Access-Control-Allow-Credentials": "true",
    "withCredentials ":"true"
  }
}

  export const requestLogin = params => { return axios.post(`preview/login/`, params).then(res => res.data); };
  export const setUpload = params => { return axios.post(`preview/config/upload/`, params, config).then(res => res.data); };
  export const setInput = params => { return axios.post(`preview/config/input/`, params).then(res => res.data); };
  export const getConfigList = params =>{ return axios.get(`preview/config/list/`, params).then(res => res.data); };
  export const getTableInfo = params => {  return axios.get(`preview/table/`, params).then(res => res.data); };
  export const getTableData = params => { return axios.get(`preview/table/data/`, params).then(res => res.data); };