import http from '../../api/http';
import * as actions from '../../actions/user';

jest.mock('../../api/http');

describe('actions', () => {
  it('should create an action to save user data', () => {
    const data = {};
    const expectedAction = { type: 'SAVE_USER_DATA', payload: data };

    expect(actions.saveUserData(data)).toEqual(expectedAction);
  });

  it('should create an action to handle sign out', () => {
    const expectedAction = { type: 'HANDLE_SIGN_OUT' };

    expect(actions.handleSignOut()).toEqual(expectedAction);
  });

  it('should create an action for makingValidationOfUser', async () => {
    const expectedData = { id: 1 };
    http.post.mockImplementation(() => Promise.resolve({ data: expectedData }));

    const result = await actions.makingValidationOfUser()(() => {});

    expect(result).toEqual(expectedData);
  });
});
