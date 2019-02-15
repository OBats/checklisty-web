/* eslint-disable default-case */
/* eslint-disable indent */

const initialState = { loggedUser: false, userData: null };

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
        default:
        return state;
    }
};

export default reducer;
