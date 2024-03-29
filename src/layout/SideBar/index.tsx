"use client";

import { ChatList, Hamburger, Search } from "@/components";
import { useGetUserChats } from "@/hooks/useGetUserChats";
import { useFilterListData } from "@/hooks/useFilterListData";
import "@/styles/layout/index.scss";

export const SideBar = () => {
  const { userChats, loading } = useGetUserChats();
  const { filteredList, handleFilterList } = useFilterListData(userChats);

  return (
    <div className="side-bar">
      <div className="top">
        <Hamburger />
        <Search className="search-chats" onChangeCallback={handleFilterList} />
      </div>
      <div className="bottom">
        <ChatList chats={filteredList} loading={loading} />
      </div>
    </div>
  );
};
