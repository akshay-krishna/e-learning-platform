const userReducer = (state, action) => {
  switch (action.type) {
    case "update":
      state = { ...state, ...action.data };
      break;
    case "login":
      state = { ...state, ...action.data };
      break;
    case "logout":
      state = { auth: false };
      break;
  }
  return state;
};

export default userReducer;
