"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef } from "react";

import { ChatMessages } from "@/components";
import { ChatTopBar, ChatInputBar } from "@/layout";
import { ChatContext } from "@/context/ChatContext";
import "@/styles/pages/index.scss";

const ChatPage = () => {
  const { chat } = useContext(ChatContext);
  const scroll = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (chat.chatId === "null") {
      return router.push("/");
    }
  }, []);

  return (
    <div className="chat-page">
      <ChatTopBar />
      <ChatMessages forwardedRef={scroll} />
      <ChatInputBar scroll={scroll} />
    </div>
  );
};

export default ChatPage;
