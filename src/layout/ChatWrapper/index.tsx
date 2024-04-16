"use client";
import { useRef } from "react";

import { ChatMessages } from "@/components";
import { ChatTopBar, ChatInputBar } from "@/layout";
import "@/styles/layout/index.scss";

export const ChatWrapper = () => {
  const scroll = useRef<HTMLDivElement>(null);

  return (
    <div className="chat-wrapper">
      <ChatTopBar />
      <ChatMessages forwardedRef={scroll} />
      <ChatInputBar scroll={scroll} />
    </div>
  );
};
