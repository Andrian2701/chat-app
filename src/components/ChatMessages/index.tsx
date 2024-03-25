"use client";
import { useContext, useEffect, useState, forwardRef } from "react";
import { onSnapshot, doc } from "firebase/firestore";

import { Message } from "@/components/index";
import { ChatContext } from "@/context/ChatContext";
import { db } from "@/utils/firebase";
import { ChatMessage } from "@/types";
import "@/styles/components/index.scss";

type Props = {
  forwardedRef: React.MutableRefObject<any>;
};

export const ChatMessages = forwardRef(({ forwardedRef }: Props) => {
  const { chat }: any = useContext(ChatContext);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chat.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => unSub();
  }, [chat.chatId]);

  return (
    <div className="chat-messages">
      {messages &&
        messages.map((m) => (
          <Message
            key={m.id}
            uid={m.uid}
            text={m.text}
            createdAt={m.createdAt}
          />
        ))}
      <span ref={forwardedRef}></span>
    </div>
  );
});
