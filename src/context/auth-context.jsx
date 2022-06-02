import { createContext, useContext, useReducer, useEffect, useState } from "react";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Toast } from "../components";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const initialState = {
  isLoggedIn: localStorage.getItem("loggedIn") ?? false,
  userData: JSON.parse(localStorage.getItem("userData")) ?? null,
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
    case "LOGOUT":
      return { ...state, ...payload };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const registerUser = async (name, email, password) => {
    try {
      setLoading(true)
      await setPersistence(auth, browserLocalPersistence);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res?.user, {
        displayName: name,
      });
      await setDoc(doc(db, "Users", res?.user?.uid), {
        name: name,
        tasks: [],
      });
      localStorage.setItem("userData", JSON.stringify(res?.user));
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        Toast({
          type: "error",
          message: "Uh Oh! Looks like that user already exists 😟",
        });
      else
        Toast({
          type: "error",
          message: "Something went wrong. Please try again 😟",
        });
      throw Error(error);
    } finally {
      setLoading(false)
    }
  };

  const signInUser = async (email, password) => {
    try {
      setLoading(true)
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === "auth/user-not-found")
        Toast({
          type: "error",
          message: "That email does not exist to us. Try again 😟",
        });
      else if (error.code === "auth/wrong-password")
        Toast({
          type: "error",
          message: "Invalid password. Please try again 😟",
        });
      else
        Toast({
          type: "error",
          message: "Unable to login. Please try again 😟",
        });
      throw Error(error);
    } finally {
      setLoading(false)
    }
  };

  const signOutUser = async () => {
    try {
      setLoading(true)
      await signOut(auth);
      navigate("/");
    } catch (error) {
      Toast({
        type: "error",
        message: "We were not able to log you out. Please try again 😟",
      });
      throw Error(error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userData", JSON.stringify(user));
        authDispatch({
          type: "LOGIN",
          payload: { isLoggedIn: true, userData: user },
        });
      } else {
        localStorage.setItem("loggedIn", false);
        localStorage.setItem("userData", null);
        authDispatch({
          type: "LOGOUT",
          payload: { isLoggedIn: false, userData: null },
        });
      }
    });

    return () => unsub;
  }, [authState.isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        registerUser,
        signInUser,
        signOutUser,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
