const initialState = {
  isConnected: false,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SOCKET_CONNECTED":
      return { ...state, isConnected: true };

    case "SOCKET_DISCONNECTED":
      return { ...state, isConnected: false };

    default:
      return state;
  }
};

export default socketReducer;
