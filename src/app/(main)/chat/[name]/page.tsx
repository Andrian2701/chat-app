"use client";
import { useRef } from "react";

import { ChatInputBar, ChatTopBar, ChatMessages } from "@/components";
import "@/styles/pages/index.scss";

type ChatPageProps = {
  params: {
    name: string;
  };
};

const ChatPage = ({ params: { name } }: ChatPageProps) => {
  const scroll = useRef<HTMLDivElement | null>(null);

  return (
    <div className="chat-page">
      <ChatTopBar />
      <ChatMessages forwardedRef={scroll} />
      <ChatInputBar scroll={scroll} />
    </div>
  );
};

export default ChatPage;
