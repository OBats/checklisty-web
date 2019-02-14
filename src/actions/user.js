/* eslint-disable import/prefer-default-export */

export function saveUserData(data) {
  return { type: 'SAVE_USER_DATA', payload: data };
}

export function handleLogOut() {
  console.error('in action handleLogOut');
  return { type: 'HANDLE_LOG_OUT' };
}
