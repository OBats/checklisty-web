/* eslint-disable import/prefer-default-export */

export function saveUserData(data) {
  return { type: 'SAVE_USER_DATA', payload: data };
}

export function handleSignOut() {
  return { type: 'HANDLE_SIGN_OUT' };
}
