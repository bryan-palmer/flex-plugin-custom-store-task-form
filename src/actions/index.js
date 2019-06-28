export const customUpdateTask = payload => ({
  type: "CUSTOM_UPDATE_TASK",
  sid: payload.sid,
  form: payload.form
});

export const customDeleteTask = sid => ({
  type: "CUSTOM_DELETE_TASK",
  sid: sid
});
