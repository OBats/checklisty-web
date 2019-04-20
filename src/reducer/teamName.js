const initialState = { name: '' };

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SHOW_TEAM_NAME': {
    return {
      name: action.payload,
    };
  }
  default:
    return state;
  }
};

export default reducer;
