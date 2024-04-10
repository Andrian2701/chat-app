import { useContext } from "react";
import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";

import { ChatMenu } from "@/components/ChatMenu";
import { ChatContext } from "@/context/ChatContext";
import "@/styles/layout/index.scss";

export const ChatTopBar = () => {
  const { chat } = useContext(ChatContext);

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
        <ChatMenu />
      </div>
    </div>
  );
};
