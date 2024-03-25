"use client";
import { useEffect, useState, ReactNode, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/utils/firebase";

export const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      (user) => user && setCurrentUser(user)
    );

    return () => unsub();
  }, []);

  console.log(currentUser);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
