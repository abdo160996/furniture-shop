import { onAuthStateChanged, updateProfile } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../configs/firebase";
const authContext = createContext();
function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
     
      if (user) {
        setUser(user);
        setLoadingUser(false);
      } else {
        setUser(null);
        setLoadingUser(false);
      }
    });
    return unsubscribe;
  }, []);


  return <authContext.Provider value={{ user, setUser, loadingUser }}>{children}</authContext.Provider>;
}

export default AuthContext;
export const useAuthContext = () => useContext(authContext);
