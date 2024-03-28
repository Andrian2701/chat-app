"use client";
import { useState } from "react";
import Link from "next/link";
import { Divider, Drawer } from "@mui/material";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoLogOutOutline } from "react-icons/io5";

import { ProfileBar } from "@/components";
import { NavBar } from "@/components";
import "@/styles/components/index.scss";

export const Hamburger = () => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <RxHamburgerMenu
        className="hamburger-icon"
        onClick={toggleDrawer(true)}
      />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div className="flex-top">
          <ProfileBar className="profile-bar" onClick={toggleDrawer(false)} />
          <Link
            href="?logOutModal=true"
            className="log-out"
            onClick={toggleDrawer(false)}
          >
            <IoLogOutOutline />
          </Link>
        </div>
        <Divider />
        <div className="flex-bottom">
          <NavBar onClick={toggleDrawer(false)} />
        </div>
      </Drawer>
    </>
  );
};
