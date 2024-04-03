"use client";
import { createContext, useContext, useMemo } from "react";

import { useGetUsers } from "@/hooks/useGetUsers";
import { AuthContext } from "./AuthContext";
import { Users } from "@/types";

type CurrentUserContext = {
  currentUserData: Users[] | null | undefined;
  loading: boolean;
};

export const CurrentUserContext = createContext<CurrentUserContext>({
  currentUserData: null,
  loading: true,
});

export const CurrentUserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { currentUser } = useContext(AuthContext);
  const { users, loading } = useGetUsers();

  const currentUserData = useMemo(() => {
    return currentUser
      ? users?.filter((user) => user.uid === currentUser.uid)
      : null;
  }, [users, currentUser]);

  return (
    <CurrentUserContext.Provider value={{ currentUserData, loading }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
