import { createContext, useContext, useEffect, useReducer } from "react";
import { taskReducer } from "../utils";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useAuth } from "./auth-context";

const TaskContext = createContext(null);

const useTasks = () => useContext(TaskContext);

const TaskProvider = ({ children }) => {
  const [taskState, taskDispatch] = useReducer(taskReducer, {
    tasks: [],
  });

  const {
    authState: { userData },
  } = useAuth();

  const getTasks = async () => {
    try {
      const docRef = await doc(db, "Users", userData?.uid);
      const getDocSnapshot = await getDoc(docRef);
      if (getDocSnapshot.exists()) {
        taskDispatch({
          type: "FETCH_TASKS",
          payload: getDocSnapshot?.data()?.tasks,
        });
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  const setTask = async (data) => {
    try {
      const docRef = await doc(db, "Users", userData?.uid);
      const getDocSnapshot = await getDoc(docRef);
      if (getDocSnapshot.exists()) {
        await updateDoc(docRef, {
          tasks: data,
        });
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  const deleteTask = async (data) => {
    try {
      const docRef = await doc(db, "Users", userData?.uid);
      const getDocSnapshot = await getDoc(docRef);
      if (getDocSnapshot.exists()) {
        await updateDoc(docRef, {
          tasks: data,
        });
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{ taskDispatch, taskState, getTasks, setTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, useTasks };
