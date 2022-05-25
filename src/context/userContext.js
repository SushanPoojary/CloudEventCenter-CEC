/* eslint-disable */
import { createContext, useContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

export const UserContext = createContext({});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useState(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
      setError("");
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // const registerUser = (email, password, name) => {
  //   setLoading(true);
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then(() =>
  //       updateProfile(auth.currentUser, {
  //         displayName: name,
  //       })
  //     )
  //     .then((res) => console.log(res))
  //     .catch((err) => setError(err.message))
  //     .finally(() => setLoading(false));
  // };

  const registerUser = async (email, password) => {
    
      try {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCred.user, {
          url: "https://master.d2zeq5uw1p13bo.amplifyapp.com/firstVisit",
        });
        // localStorage.setItem("password", password);
        return {
          user: userCred.user,
        };
        
      } catch (e) {
        return {
          error: e.message,
        };
      }
    
}

  const googleLogin = async () => {

    const provider = new GoogleAuthProvider();
    try {
      const userCred = await signInWithPopup(auth, provider);
      await sendEmailVerification(userCred.user, {
        url: "https://master.d2zeq5uw1p13bo.amplifyapp.com/firstVisit",
      });
      // localStorage.setItem("password", 'google');
      return {
        user: userCred.user,
      };
      
    } catch (e) {
      return {
        error: e.message,
      };
    }

  }


  const signInUser = (email, password) => {
    setLoading(true);
    // localStorage.setItem("password", password);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => console.log(res))
      .catch((err) => setError(err.code))
      .finally(() => setLoading(false));
  };

  const logoutUser = () => {
    signOut(auth);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const contextValue = {
    user,
    loading,
    error,
    signInUser,
    registerUser,
    googleLogin,
    logoutUser,
    forgotPassword,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
