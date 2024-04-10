"use client";
import { useRef } from "react";

import { ChatMessages } from "@/components";
import { ChatTopBar, ChatInputBar } from "@/layout";
import "@/styles/pages/index.scss";

const ChatPage = () => {
  const scroll = useRef<HTMLDivElement>(null);

  return (
    <div className="chat-page">
      <ChatTopBar />
      <ChatMessages forwardedRef={scroll} />
      <ChatInputBar scroll={scroll} />
    </div>
  );
};

export default ChatPage;
