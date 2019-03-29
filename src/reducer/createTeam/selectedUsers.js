/* eslint-disable default-case */
/* eslint-disable indent */

const initialState = {
    arrayOfSelectedUsers: null,
    showSuggestion: false,
    showSelectedUsers: false,
    searchUserValue: '',
    animationState: false,
    searchTeamValue: '',
    teams: null,
    activePage: 1,
    totalPage: 1,
    selectTeams: '5',
};

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
        case 'REMOVE_USER': {
            return {
                ...state,
                arrayOfSelectedUsers: action.payload,
            };
        }
        case 'SHOW_SELECTED_USERS': {
            return {
                ...state,
                showSelectedUsers: action.payload,
            };
        }
        case 'SAVE_SEARCH_VALUE': {
            return {
                ...state,
                searchUserValue: action.payload,
            };
        }
        case 'CHANGE_ANIMATION': {
            return {
                ...state,
                animationState: action.payload,
            };
        }
        case 'FETCH_TEAMS': {
            return {
                ...state,
                teams: action.payload,
            };
        }
        case 'SAVE_SEARCH_TEAM': {
            return {
                ...state,
                searchTeamValue: action.payload,
            };
        }
        case 'CHANGE_TEAM_TOTAL_PAGE_VALUE': {
            return {
              ...state,
              totalPage: action.payload,
            };
          }

        case 'TEAM_ACTIVE_PAGE': {
            return {
              ...state,
              activePage: action.payload,
            };
          }
          case 'RESET_TEAM_ACTIVE_PAGE': {
            return {
              ...state,
              activePage: 1,
            };
          }
          case 'CHANGE_TEAMS_AMOUNT': {
            return {
              ...state,
              selectTeams: action.payload,
            };
          }
        default:
        return state;
    }
};

export default reducer;
