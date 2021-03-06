import axios from './axios';
import store from '../store';
import { handleSignOut } from '../actions/user';
import { ErrorHandling } from '../components/toasters/MessagesHandling';

const unauthorizedStatus = 401;
const getToken = () => localStorage.getItem('access-token');

const get = (url, params) => {
  const request = axios.get(url, {
    params,
    headers: {
      'access-token': getToken(),
    },
  });

  request.catch((error) => {
    if (!error.response) {
      ErrorHandling(error.message);
      return;
    }
    try {
      if (error.response.status === unauthorizedStatus) {
        store.dispatch(handleSignOut());
        localStorage.removeItem('access-token');
      }
    } catch (error) {
      throw error;
    }
  });

  return request;
};

const post = (url, params) => {
  const request = axios.post(url, params, {
    headers: {
      'access-token': getToken(),
    },
  });

  request.catch((error) => {
    if (!error.response) {
      ErrorHandling(error.message);
      return;
    }
    try {
      if (error.response.status === unauthorizedStatus) {
        store.dispatch(handleSignOut());
        localStorage.removeItem('access-token');
      }
    } catch (error) {
      throw error;
    }
  });

  return request;
};


const put = (url, params) => {
  const request = axios.put(url, params, {
    headers: {
      'access-token': getToken(),
    },
  });

  request.catch((error) => {
    if (!error.response) {
      ErrorHandling(error.message);
      return;
    }
    try {
      if (error.response.status === unauthorizedStatus) {
        store.dispatch(handleSignOut());
        localStorage.removeItem('access-token');
      }
    } catch (error) {
      throw error;
    }
  });

  return request;
};

const patch = (url, params) => {
  const request = axios.patch(url, params, {
    headers: {
      'access-token': getToken(),
    },
  });

  request.catch((error) => {
    if (!error.response) {
      ErrorHandling(error.message);
      return;
    }

    try {
      if (error.response.status === unauthorizedStatus) {
        store.dispatch(handleSignOut());
        localStorage.removeItem('access-token');
      }
    } catch (error) {
      throw error;
    }
  });

  return request;
};


const del = (url) => {
  const request = axios.delete(url, {
    headers: {
      'access-token': getToken(),
    },
  });

  request.catch((error) => {
    if (!error.response) {
      ErrorHandling(error.message);
      return;
    }
    try {
      if (error.response.status === unauthorizedStatus) {
        store.dispatch(handleSignOut());
        localStorage.removeItem('access-token');
      }
    } catch (error) {
      throw error;
    }
  });

  return request;
};

export default {
  get,
  post,
  put,
  patch,
  delete: del,
};
