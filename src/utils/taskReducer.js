export function taskReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: payload.id,
            title: payload.title,
            desc: payload.desc,
            focusDuration: payload.focusDuration,
            breakDuration: payload.breakDuration,
          },
        ],
      };

    case "UPDATE_TASK":
      return { ...state, tasks: [...payload] };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== payload.id),
      };

    default:
      return state;
  }
}
