import { createContext, useContext } from "react";

const TaskContext = createContext(null);

const useTasks = () => useContext(TaskContext);

const TaskProvider = ({ children }) => {
  return <TaskContext.Provider>{children}</TaskContext.Provider>;
};

export { TaskProvider, useTasks };
