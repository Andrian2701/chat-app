"use client";
import { useContext, useEffect, useState, forwardRef } from "react";
import { onSnapshot, doc } from "firebase/firestore";

import { Message } from "@/components/index";
import { ChatContext } from "@/context/ChatContext";
import { db } from "@/utils/firebase";
import { Chat, Messages } from "@/types";
import "@/styles/components/index.scss";

type Props = {
  forwardedRef: React.RefObject<HTMLDivElement>;
};

export const ChatMessages = forwardRef(({ forwardedRef }: Props) => {
  const { chat }: Chat = useContext(ChatContext);
  const [messages, setMessages] = useState<Messages[]>([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chat.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => unSub();
  }, [chat.chatId]);

  return (
    <div className="chat-messages">
      {messages && messages.map((m) => <Message key={m.id} data={m} />)}
      <span ref={forwardedRef}></span>
    </div>
  );
});
