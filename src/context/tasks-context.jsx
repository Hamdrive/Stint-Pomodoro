import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { taskReducer } from "../utils";

const tasksData = { tasks: [] };

const TaskContext = createContext(null);

const useTasks = () => useContext(TaskContext);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const [taskState, taskDispatch] = useReducer(taskReducer, tasksData);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskState.tasks));
    setTasks(taskState.tasks);
  }, [taskState]);

  return (
    <TaskContext.Provider value={{ taskDispatch, tasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, useTasks };
