import { useState } from "react";
import Link from "next/link";
import { Divider, IconButton, Menu } from "@mui/material";
import { TbUserCircle } from "react-icons/tb";
import { LiaBroomSolid } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { BiBrush } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";

import "@/styles/components/index.scss";

export const ChatMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{ padding: "0rem 0rem 0rem 0rem" }}
        disableRipple
      >
        <HiOutlineDotsVertical />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="chat-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link href="?userInfo=true">
          <TbUserCircle />
          <p>View profile</p>
        </Link>
        <Divider />
        <Link href="#">
          <BiBrush />
          <p>Set theme</p>
        </Link>
        <Link href="?clearChat=true">
          <LiaBroomSolid />
          <p>Clear chat</p>
        </Link>
        <Link href="?deleteChat=true" style={{ color: "#d0312d" }}>
          <AiOutlineDelete />
          <p>Delete chat</p>
        </Link>
      </Menu>
    </>
  );
};
