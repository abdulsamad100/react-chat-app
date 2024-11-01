import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../JS Files/Firebase";

export const AuthContext = createContext({
  userLoggedIn: null,
})


export const AuthProvider = ({ children }) => {
  const [signin, setSignin] = useState({ userLoggedIn: null });
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid
        setSignin({ userLoggedIn: user})
        console.log(user);
        
      } else {
        setSignin({ userLoggedIn: null })
        // navigate("/login")
      }
    });
  }, [])
  return (
    <AuthContext.Provider value={{ signin, setSignin }}>
      {children}
    </AuthContext.Provider>
  );
}