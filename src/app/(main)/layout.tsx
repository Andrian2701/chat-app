"use client";

import { LogOut, CurrentProfile, AddChat } from "@/components";
import { SideBar } from "@/layout";
import { withAuth } from "@/utils/withAuth";
import "@/styles/base/index.scss";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="main-layout">
      <SideBar />
      <LogOut />
      <CurrentProfile />
      <AddChat />
      {children}
    </div>
  );
};

export default withAuth(MainLayout);
