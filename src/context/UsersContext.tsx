"use client";
import { createContext } from "react";

import { useGetUsers } from "@/hooks/useGetUsers";
import { Users } from "@/types";

type UsersContext = {
  users: Users[] | null;
  loading: boolean;
};

export const UsersContext = createContext<UsersContext>({
  users: null,
  loading: true,
});

export const UsersContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { users, loading } = useGetUsers();

  return (
    <UsersContext.Provider value={{ users, loading }}>
      {children}
    </UsersContext.Provider>
  );
};
