"use client";

import { useState, useEffect } from "react";

import { Chats, Hamburger, SearchChats } from "@/components";
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
  const [filteredUsers, setFilteredUsers] = useState<Users[] | undefined>([]);

  useEffect(() => {
    if (users !== null && users !== undefined) {
      Object.keys(users).length > 0 && setFilteredUsers(users);
    }
  }, [users]);

  const handleFilterUsers = (searchTerm: string) => {
    const filteredItems: Users[] | undefined = users?.filter((user) =>
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
