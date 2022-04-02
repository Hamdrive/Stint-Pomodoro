

// allow state to access on initialization
export const getTaskInfo = (tasks, modal) =>
  tasks.filter((task) => task.id === modal.id);

export const updateTasks = (tasks, info) => {
  let isPresent = false;
  let updatedTasks = tasks.map((item) => {
    if (item.id === info.id) {
      isPresent = true;
      return { ...info };
    }
    return item;
  });

  if (!isPresent) {
    updatedTasks = [...tasks, { ...info }];
  }

  return updatedTasks;
};
