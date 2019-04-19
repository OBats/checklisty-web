/* eslint-disable default-case */
/* eslint-disable indent */

const initialState = { loggedUser: false, userData: null, userInvites: null };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_USER_DATA': {
            return {
                userData: action.payload,
                loggedUser: true,
            };
        }
        case 'HANDLE_SIGN_OUT': {
            return {
                userData: null,
                loggedUser: false,
            };
        }
        case 'FETCH_USER_INVITES': {
            return {
                ...state,
                userInvites: action.payload,
            };
        }
        case 'DECLINE_INVITE': {
            return {
                ...state,
                userInvites: action.payload,
            };
        }
        default:
        return state;
    }
};

export default reducer;
