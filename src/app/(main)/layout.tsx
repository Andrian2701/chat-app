"use client";

import { LogOut, AuthProfile } from "@/components";
import { SideBar } from "@/layout";
import { withAuth } from "@/utils/withAuth";
import "@/styles/index.scss";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="main">
      <SideBar />
      <LogOut />
      <AuthProfile />
      {children}
    </div>
  );
};

export default withAuth(MainLayout);
