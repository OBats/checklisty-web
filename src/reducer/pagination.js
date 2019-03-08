
const initialState = { activePage: 1 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SAVE_ACTIVE_PAGE': {
    return {
      activePage: action.payload,
    };
  }
  case 'RESET_ACTIVE_PAGE': {
    return {
      activePage: 1,
    };
  }

  default:
    return state;
  }
};

export default reducer;
