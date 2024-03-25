"use client";

import { useState, useEffect, useMemo, useContext } from "react";

import { ChatList, Hamburger, SearchChats } from "@/components";
import { UsersContext } from "@/context/UsersContext";
import { AuthContext } from "@/context/AuthContext";
import "@/styles/layout/index.scss";

export type Users = {
  bio: string;
  email: string;
  name: string;
  uid: string;
  avatar: string;
};

export const SideBar = () => {
  const { users, loading } = useContext(UsersContext);
  const { currentUser } = useContext(AuthContext);
  const [filteredUsers, setFilteredUsers] = useState<Users[] | undefined>([]);

  const currentUserData = useMemo(() => {
    return currentUser
      ? users?.filter((user) => user.uid !== currentUser.uid)
      : null;
  }, [users, currentUser]);

  useEffect(() => {
    if (currentUserData !== null && currentUserData !== undefined) {
      Object.keys(currentUserData).length > 0 &&
        setFilteredUsers(currentUserData);
    }
  }, [currentUserData]);

  const handleFilterUsers = (searchTerm: string) => {
    const filteredItems: Users[] | undefined = currentUserData?.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  };

  return (
    <div className="side-bar">
      <div className="side-bar-top">
        <Hamburger />
        <SearchChats onChangeCallback={handleFilterUsers} />
      </div>
      <div className="side-bar-bottom">
        <ChatList users={filteredUsers} loading={loading} />
      </div>
    </div>
  );
};
