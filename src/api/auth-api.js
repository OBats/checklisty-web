import http from './http';

export const signIn = values => (
  http.post('/api/auth/signin', values)
    .then(resp => localStorage.setItem('access-token', resp.data.user.token))
);

export const signUp = values => (
  http.post('/api/auth/signup', values)
    .then(resp => localStorage.setItem('access-token', resp.data.user.token))
);

export const signOut = () => {
  localStorage.removeItem('access-token');
};
