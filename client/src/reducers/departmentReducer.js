const departmentReducer = (state, action) => {
  const { type, data } = action;
  switch (type) {
    case "set":
      state = data;
      break;
  }

  return state;
};

export default departmentReducer;
