export function taskReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, payload],
      };
    case "FETCH_TASKS":
    case "UPDATE_TASK":
    case "DELETE_TASK":
      return { ...state, tasks: payload };

    case "CLEAR_TASKS":
      return { ...state, tasks: [] };

    default:
      return state;
  }
}
