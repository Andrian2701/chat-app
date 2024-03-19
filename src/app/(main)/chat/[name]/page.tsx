"use client";
import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { Chat } from "@/components/Chat";
import { ChatInputBar } from "@/components";
import "@/styles/pages/index.scss";

type ChatPageProps = {
  params: {
    name: string;
  };
};

const ChatPage = ({ params: { name } }: ChatPageProps) => {
  return (
    <div className="chat-page">
      <div className="chat-top-bar">
        <div className="chat-name">
          <Link href="/" className="go-back">
            <RiArrowLeftLine />
          </Link>
          <p>{decodeURIComponent(name)}</p>
        </div>
        <div className="top-icons">
          <IoIosSearch />
          <HiOutlineDotsVertical />
        </div>
      </div>
      <Chat />
      <ChatInputBar />
    </div>
  );
};

export default ChatPage;
