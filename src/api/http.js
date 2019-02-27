import axios from './axios';

const get = (url, params) => axios.get(url, params);

const post = (url, params) => axios.post(url, params);

const put = (url, params) => axios.put(url, params);

const del = url => axios.delete(url);

export default {
  get,
  post,
  put,
  delete: del,
};
