import { useContext } from "react";
import Link from "next/link";
import { IconButton } from "@mui/material";
import { RiArrowLeftLine } from "react-icons/ri";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";

import { PopupMenu } from "@/components";
import { ChatContext } from "@/context/ChatContext";
import { useMenuState } from "@/hooks/useMenuState";
import { chatMenuItems } from "@/utils/const";
import "@/styles/layout/index.scss";

export const ChatTopBar = () => {
  const { chat } = useContext(ChatContext);
  const { handleClick, open, anchorEl, handleClose } = useMenuState();

  return (
    <div className="chat-top-bar">
      <div className="flex-left">
        <Link href="/" className="go-back">
          <RiArrowLeftLine />
        </Link>
        <Link href="?userInfo=true">
          <p>{chat.user.name}</p>
        </Link>
      </div>
      <div className="flex-right">
        <IoIosSearch />
        <IconButton
          onClick={handleClick}
          sx={{ padding: "0rem 0rem 0rem 0rem" }}
          disableRipple
        >
          <HiOutlineDotsVertical />
        </IconButton>
        <PopupMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          menuItems={chatMenuItems}
        />
      </div>
    </div>
  );
};
