import http from './http';

export const signIn = async (values) => {
  const response = await http.post('/api/auth/signin', values);
  localStorage.setItem('access-token', response.data);
  return response.data.user;
};

export const signUp = async (values) => {
  const responce = await http.post('/api/auth/signup', values);
  localStorage.setItem('access-token', responce.headers['access-token']);
  return responce.data.user;
};

export const validateUser = async () => {
  const { data } = await http.post('./api/auth/validate');
  return data;
};

export const signOut = () => {
  localStorage.removeItem('access-token');
  // window.location = '/';
};
