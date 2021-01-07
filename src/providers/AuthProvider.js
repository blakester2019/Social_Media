import React, { useState, useEffect } from "react";
import FirebaseApp from "../firebase/Firebase";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser ] = useState(null);

  useEffect(() => {
    FirebaseApp.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{currentUser}}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;