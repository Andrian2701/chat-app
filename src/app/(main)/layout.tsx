"use client";
import { ReactNode } from "react";

import { LogOut, Profile } from "@/components";
import { SideBar } from "@/layout";
import { withAuth } from "@/utils/withAuth";
import "@/styles/main.scss";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="main">
      <SideBar />
      <LogOut />
      <Profile />
      {children}
    </div>
  );
};

export default withAuth(MainLayout);
