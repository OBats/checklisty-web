import axios from 'axios';

const getToken = () => localStorage.getItem('access-token');

const get = (url, params) => axios.get(url, {
  params,
  headers: {
    'access-token': getToken(),
  },
});
const post = (url, params) => axios.post(url, params, {
  headers: {
    'access-token': getToken(),
  },
});
const put = (url, params) => axios.put(url, params, {
  headers: {
    'access-token': getToken(),
  },
});
const del = url => axios.delete(url, {
  headers: {
    'access-token': getToken(),
  },
});

export default {
  get,
  post,
  put,
  delete: del,
};
