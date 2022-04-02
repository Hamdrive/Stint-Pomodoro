import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext(null);

const useTask = () => useContext(TaskContext);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("userTasks")) ?? []
  );

  const handleTasks = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "https://62478c20229b222a3fcdfa2c.mockapi.io/api/v1/tasks"
        );
        setTasks(res.tasks);
      } catch (error) {
        throw Error(error);
      }
    })();
  }, []);

  // stores tasks in localstorage
  useEffect(() => {
    localStorage.setItem("userTasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, handleTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, useTask };
