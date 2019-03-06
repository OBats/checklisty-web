import http from '../../api/http';
import { signIn, signUp, validateUser, signOut, postAvatarUrl } from '../../api/auth-api';

jest.mock('../../api/http');
const mockPostRequest = response => http.post.mockImplementation(() => Promise.resolve(response));

beforeEach(() => {
  localStorage.__STORE__ = {};

  jest.resetAllMocks();
});

it('should return the same email as passed in signIn', async () => {
  const email = 'test@gmail.com';
  const values = { email, password: 'root' };
  const response = { data: { user: { email } }, headers: { 'access-token': 'token' } };
  mockPostRequest(response);

  const result = await signIn(values);

  expect(result).toEqual({ email });
});

it('should return the same email and username as passed in signUp', async () => {
  const email = 'test@gmail.com';
  const username = 'username';
  const values = { email, username, password: 'root' };
  const response = { data: { user: { email, username }, message: 'User created' }, headers: { 'access-token': 'token' } };
  mockPostRequest(response);

  const result = await signUp(values);

  expect(result).toEqual({ email, username });
});

it('should return username and email in validateUser', async () => {
  const email = 'test@gmail.com';
  const username = 'username';
  const response = { data: { email, username } };
  mockPostRequest(response);

  const result = await validateUser();

  expect(result).toEqual({ email, username });
});

it('should remove access token in signOut', () => {
  localStorage.setItem('access-token', 'token');

  signOut();

  const result = localStorage.getItem('access-token');
  expect(result).toEqual(null);
});

it('should return the same avatarUrl as passed in postAvatarUrl', async () => {
  const image = 'avatarUrl';
  const response = { data: { image } };
  mockPostRequest(response);

  const result = await postAvatarUrl(image);

  expect(result).toEqual({ image });
});
