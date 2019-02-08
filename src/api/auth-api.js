import http from './http';

export const signIn = async (values) => {
  await http.post('/api/auth/signin', values)
    .then((req) => {
      localStorage.setItem('access-token', req.data);
    });
};

export const signUp = async (values) => {
  await http.post('/api/auth/signup', values)
    .then((req) => {
      localStorage.setItem('access-token', req.headers['access-token']);
    });
};

export const validateUser = async () => {
  const { data } = await http.post('./api/auth/validate');
  return data;
};

export const signOut = () => {
  localStorage.removeItem('access-token');
  window.location = '/';
};
