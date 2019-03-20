
const initialState = { loader: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SAVE_HISTORY_LOADER': {
    return {
      loaderValue: action.payload,
    };
  }

  default:
    return state;
  }
};

export default reducer;
