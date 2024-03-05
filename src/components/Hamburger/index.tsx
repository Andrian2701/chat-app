"use client";
import { useState } from "react";
import Link from "next/link";
import { Divider, Drawer } from "@mui/material";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";

import { ProfileMenu } from "../ProfileMenu";
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
          <Link href="?logOutModal=true" className="log-out">
            <IoLogOutOutline />
          </Link>
        </div>
        <Divider />
        <div className="bottom">
          <NavBar />
        </div>
      </Drawer>
    </div>
  );
};
