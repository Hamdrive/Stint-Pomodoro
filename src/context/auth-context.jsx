import { createContext, useContext, useReducer, useEffect } from "react";
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

  const navigate = useNavigate();

  const registerUser = async (name, email, password) => {
    console.log(auth, email, password, name);
    try {
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
      throw Error(error);
    }
  };

  const signInUser = async (email, password) => {
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
      navigate("/");
    } catch (error) {
      throw Error(error);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("userData", JSON.stringify(user));
        authDispatch({
          type: "LOGIN",
          payload: { isLoggedIn: true, user },
        });
      } else {
        localStorage.setItem("loggedIn", false);
        authDispatch({
          type: "LOGOUT",
          payload: { isLoggedIn: false, user: null },
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
