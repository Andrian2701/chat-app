"use client";

import { useState, useEffect, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { Chats, Hamburger, SearchChats } from "@/components";
import { auth } from "@/utils/firebase";
import { useGetUsers } from "@/hooks/useGetUsers";
import "@/styles/layout/index.scss";

export type Users = {
  bio: string;
  email: string;
  name: string;
  uid: string;
  avatar: string;
};

export const SideBar = () => {
  const { users, loading } = useGetUsers();
  const [currentUserUid, setCurrentUserUid] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<Users[] | undefined>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUid(user.uid);
      }
    });
  }, []);

  const currentUser = useMemo(
    () => users?.filter((user) => user.uid !== currentUserUid),
    [users, currentUserUid]
  );

  useEffect(() => {
    if (currentUser !== null && currentUser !== undefined) {
      Object.keys(currentUser).length > 0 && setFilteredUsers(currentUser);
    }
  }, [currentUser]);

  const handleFilterUsers = (searchTerm: string) => {
    const filteredItems: Users[] | undefined = currentUser?.filter((user) =>
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
        <Chats users={filteredUsers} loading={loading} />
      </div>
    </div>
  );
};
