const departmentOption = (state, action) => {
  switch (action.type) {
    case "cls":
      state.classroom = true;
      state.staff = false;
      state.student = false;
      break;
    case "staff":
      state.classroom = false;
      state.staff = true;
      state.student = false;
      break;
    case "student":
      state.classroom = false;
      state.staff = false;
      state.student = true;
      break;
  }

  return state;
};
export default departmentOption;
