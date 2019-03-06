/* eslint-disable import/prefer-default-export */
import { validateUser } from '../api/auth-api';

export function saveUserData(data) {
  return { type: 'SAVE_USER_DATA', payload: data };
}

export function handleSignOut() {
  return { type: 'HANDLE_SIGN_OUT' };
}

export function makingValidationOfUser() {
  return async (dispatch) => {
    try {
      const data = await validateUser();
      dispatch(saveUserData(data));
      return data;
    } catch {
      dispatch(handleSignOut());
    }
  };
}
