
const initialState = { activePage: 1 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SAVE_ACTIVE_PAGE': {
    return {
      activePage: action.payload,
    };
  }

  default:
    return state;
  }
};

export default reducer;
