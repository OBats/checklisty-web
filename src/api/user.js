import { validateUser } from './auth-api';
import { saveUserData } from '../actions/user';

const updateUser = async () => {
  try {
    const user = await validateUser();
    saveUserData(user);
  } catch {
    console.error('there is an error from request /api/auth/validate');
  }
};

export default updateUser;
