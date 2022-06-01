import { createContext, useContext, useEffect, useReducer } from "react";
import { taskReducer } from "../utils";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useAuth } from "./auth-context";
import { Toast } from "../components";

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
          tasks: arrayUnion(data),
        });
        Toast({
          type: "success",
          message: "New task added 🚀",
        });
      }
    } catch (e) {
      Toast({
        type: "error",
        message: "Something went wrong. Please try again 😟",
      });
      throw new Error(e);
    }
  };

  const updateTask = async (data) => {
    try {
      const docRef = await doc(db, "Users", userData?.uid);
      const getDocSnapshot = await getDoc(docRef);
      if (getDocSnapshot.exists()) {
        await updateDoc(docRef, {
          tasks: data,
        });
        Toast({
          type: "success",
          message: "Task updated 📝",
        });
      }
    } catch (e) {
      Toast({
        type: "error",
        message: "Something went wrong. Please try again 😟",
      });
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
        Toast({
          type: "success",
          message: "Task deleted 🧹",
        });
      }
    } catch (e) {
      Toast({
        type: "error",
        message: "Something went wrong. Please try again 😟",
      });
      throw new Error(e);
    }
  };

  useEffect(() => {
    !userData && taskDispatch({ type: "CLEAR_TASKS" });
    userData && getTasks();
  }, [userData]);

  return (
    <TaskContext.Provider
      value={{
        taskDispatch,
        taskState,
        getTasks,
        setTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, useTasks };
