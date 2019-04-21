const initialState = {
  onlineUsers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'GET_CHAT_ONLINE_USERS': {
    return {
      ...state,
      onlineUsers: action.payload,
    };
  }

  default: return state;
  }
};

export default reducer;
