"use client";
import { useContext, useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { forwardRef } from "react";

import { Message } from "@/components/index";
import { ChatContext } from "@/context/ChatContext";
import { db } from "@/utils/firebase";
import "@/styles/components/index.scss";

type ChatMessages = {
  uid: string;
  text: string;
  createdAt: { seconds: number; nanoseconds: number };
};

type ChatMessagesProps = {
  forwardedRef: React.MutableRefObject<any>;
};

export const ChatMessages = forwardRef(
  ({ forwardedRef }: ChatMessagesProps) => {
    const [messages, setMessages] = useState<ChatMessages[]>([]);
    const { chat }: any = useContext(ChatContext);

    useEffect(() => {
      const unSub = onSnapshot(doc(db, "chats", chat.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    }, [chat.chatId]);

    return (
      <div className="chat-field">
        {messages &&
          messages.map((m) => (
            <Message
              key={m.createdAt.seconds}
              uid={m.uid}
              text={m.text}
              createdAt={m.createdAt}
            />
          ))}
        <span ref={forwardedRef}></span>
      </div>
    );
  }
);
