import axios from 'axios';

let base = 'http://10.10.30.70:8000/preview';
let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }

  export const requestLogin = params => { return axios.post(`${base}/login/`, params).then(res => res.data); };
  export const setUpload = params => { return axios.post(`${base}/config/upload/`, params, config).then(res => res.data); };
  export const setInput = params => { return axios.post(`${base}/config/input/`, params).then(res => res.data); };
  export const getConfigList = params =>{ return axios.get(`${base}/config/list/`, params).then(res => res.data); };
  export const getTableInfo = params => {  return axios.get(`${base}/table/`, params).then(res => res.data); };
  export const getTableData = params => { return axios.get(`${base}/table/data/`, params).then(res => res.data); };