import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { taskReducer } from "../utils";

const TaskContext = createContext(null);

const useTasks = () => useContext(TaskContext);

const TaskProvider = ({ children }) => {

  const [taskState, taskDispatch] = useReducer(taskReducer, {
    tasks: JSON.parse(localStorage.getItem("tasks")) ?? []
   });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskState.tasks));
  }, [taskState]);

  return (
    <TaskContext.Provider value={{ taskDispatch, taskState }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, useTasks };
