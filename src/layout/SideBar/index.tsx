import { Chats, Hamburger, SearchChats } from "@/components/index";

import "@/styles/layout/index.scss";

export const SideBar = () => {
  return (
    <div className="side-bar">
      <div className="side-bar-top">
        <Hamburger />
        <SearchChats />
      </div>
      <div className="side-bar-bottom">
        <Chats />
      </div>
    </div>
  );
};
