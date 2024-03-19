"use client";
import { ChatContext } from "@/context/ChatContext";
import { useContext } from "react";
import "@/styles/components/index.scss";

export const Chat = () => {
  const { chat } = useContext(ChatContext);
  console.log(chat);

  return (
    <div className="chat-field">
      <div>message</div>
    </div>
  );
};
