/* eslint-disable default-case */
/* eslint-disable indent */

const initialState = { arrayOfSelectedUsers: [], showSuggestion: false, searchUser: '' };

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SELECTED_USER': {
            return {
                ...state,
                arrayOfSelectedUsers: action.payload,
            };
        }
        case 'SHOW_SUGGESTION': {
            return {
                ...state,
                showSuggestion: action.payload,
            };
        }
        case 'SEARCH_USERS': {
            return {
                ...state,
                searchUsersValue: action.payload,
            };
        }
        default:
        return state;
    }
};

export default reducer;
