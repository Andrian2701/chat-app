"use client";
import { useState } from "react";
import { Divider, Drawer } from "@mui/material";
import { RxHamburgerMenu } from "react-icons/rx";

import { ProfileMenu } from "../ProfileMenu";
import { LogOut } from "../LogOut";
import { NavBar } from "../NavBar";
import "@/styles/components/index.scss";

export const Hamburger = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <RxHamburgerMenu
        className="hamburger-icon"
        onClick={toggleDrawer(true)}
      />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div className="top">
          <ProfileMenu />
          <LogOut />
        </div>
        <Divider />
        <div className="bottom">
          <NavBar />
        </div>
      </Drawer>
    </div>
  );
};
