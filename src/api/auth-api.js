import http from './http';

export const signIn = async (values) => {
  const response = await http.post('/api/auth/signin', values);
  localStorage.setItem('access-token', response.headers['access-token']);
  return response.data.user;
};

export const signUp = async (values) => {
  const response = await http.post('/api/auth/signup', values);
  localStorage.setItem('access-token', response.headers['access-token']);
  return response.data.user;
};

export const validateUser = async () => {
  const { data } = await http.post('/api/auth/validate');
  return data;
};

export const signOut = () => {
  localStorage.removeItem('access-token');
};

export const postAvatarUrl = async (imgUrl) => {
  const response = await http.post('/api/profile/avatar', { img: imgUrl });
  return response;
};
