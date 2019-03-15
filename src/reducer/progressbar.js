
const initialState = { progress: { currentProgress: 0, amountOfCheckedItems: 0 } };

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SAVE_ACTIVE_PROGRESSBAR': {
    return {
      progress: action.payload,
    };
  }
  default:
    return state;
  }
};

export default reducer;
