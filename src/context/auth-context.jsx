import { createContext, useContext, useReducer } from "react";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase-config";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const initialState = {
  isLoggedIn: localStorage.getItem("loggedIn") ?? false,
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return { ...state, ...payload };
    default:
      return state;
  }
};

const registerUser = async ({ email, password, firstname, lastname }) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, {
      displayName: firstname + " " + lastname,
    });
  } catch (error) {
    throw Error(error);
  }
};

const signInUser = async ({ email, password }) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw Error(error);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw Error(error);
  }
};

const setTask = async (uid, data) => {
  try {
    const docRef = collection(db, "Users", uid, "tasks");
    await addDoc(docRef, data);
  } catch (e) {
    throw new Error(e);
  }
};

const updateTask = async (uid, docId, data) => {
  try {
    const docRef = doc(db, "Users", uid, "tasks", docId);
    await updateDoc(docRef, data);
  } catch (e) {
    throw new Error(e);
  }
};

const deleteTask = async (uid, docId) => {
  try {
    const docRef = doc(db, "Users", uid, "tasks", docId);
    await deleteDoc(docRef);
  } catch (e) {
    throw new Error(e);
  }
};

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        registerUser,
        signInUser,
        signOutUser,
        setTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
