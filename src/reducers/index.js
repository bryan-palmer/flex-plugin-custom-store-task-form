const defaultState = {
  tasks: {}
};

const customReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CUSTOM_UPDATE_TASK":
      state.tasks[action.sid] = action.form;
      return state;

    case "CUSTOM_DELETE_TASK":
      delete state.tasks[action.sid];
      return state;

    default:
      return state;
  }
};

export default customReducer;
