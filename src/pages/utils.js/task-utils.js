import axios from "axios";

export const deleteTask = async (tasks, taskID) => {
  const res = await axios.delete(
    `https://62478c20229b222a3fcdfa2c.mockapi.io/api/v1/tasks/${taskID}`
  );
  if (res.status === 200 || res.status === 201) {
    const removeTask = tasks.filter((task) => task.id !== taskID);
    return removeTask;
  }
};
