"use client";

import {
  LogOut,
  CurrentProfile,
  AddChat,
  UserInfo,
  EditChat,
  ChatAction,
} from "@/components";
import { SideBar } from "@/layout";
import { withAuth } from "@/utils/withAuth";
import "@/styles/base/index.scss";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="main-layout">
      <SideBar />
      <LogOut />
      <CurrentProfile />
      <UserInfo />
      <AddChat />
      <ChatAction />
      <EditChat />
      {children}
    </div>
  );
};

export default withAuth(MainLayout);
