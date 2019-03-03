import reducer from '../../reducer/user';

describe('reducer', () => {
  it('Auth reducer initial state is correct', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const initialState = { loggedUser: false, userData: null };

    expect(reducer(undefined, action)).toEqual(initialState);
  });

  it('should store user data', () => {
    const action = { type: 'SAVE_USER_DATA', payload: {} };
    const currentState = { loggedUser: true, userData: {} };

    expect(reducer(undefined, action)).toEqual(currentState);
  });

  it('should change state after sign out', () => {
    const action = { type: 'HANDLE_SIGN_OUT' };
    const initialState = { loggedUser: false, userData: null };

    expect(reducer(undefined, action)).toEqual(initialState);
  });
});
