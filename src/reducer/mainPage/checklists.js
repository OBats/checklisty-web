/* eslint-disable default-case */
/* eslint-disable indent */

const initialState = {
  checklists: null,
  componentLoader: true,
  totalPage: 1,
  listsLoader: false,
  activePage: 1,
  searchFilter: '',
  selectItems: 5,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CHECKLISTS': {
            return {
                ...state,
                checklists: action.payload,
            };
        }
        case 'CHANGE_COMPONENT_LOADING': {
            return {
              ...state,
              componentLoader: action.payload,
            };
          }
        case 'CHANGE_LISTS_LOADING': {
            return {
                ...state,
                listsLoader: action.payload,
            };
        }
        case 'CHANGE_TOTAL_PAGE_VALUE': {
            return {
              ...state,
              totalPage: action.payload,
            };
          }
        case 'SAVE_ACTIVE_PAGE': {
            return {
              ...state,
              activePage: action.payload,
            };
          }
          case 'RESET_ACTIVE_PAGE': {
            return {
              ...state,
              activePage: 1,
            };
          }
          case 'SAVE_SEARCH_VALUE': {
            return {
              ...state,
              searchFilter: action.payload,
            };
          }
          case 'CHANGE_VALUE_SELECT': {
            return {
              ...state,
              selectItems: action.payload,
            };
          }
          default:
            return state;
  }
};
export default reducer;
