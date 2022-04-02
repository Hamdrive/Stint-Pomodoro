import axios from "axios";

export const deleteTask = async (tasks, taskID) => {
  const removeTask = tasks.filter((task) => task.id !== taskID);
  const updatedTasks = await axios.delete(`/tasks/${taskID}`);
  return removeTask;
};
