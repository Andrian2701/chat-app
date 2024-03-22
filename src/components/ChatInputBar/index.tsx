"use client";
import { useState, useContext } from "react";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { PiImage } from "react-icons/pi";
import { GoSmiley } from "react-icons/go";
import { IoSendSharp } from "react-icons/io5";

import { ChatContext } from "@/context/ChatContext";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/utils/firebase";
import "@/styles/components/index.scss";

export const ChatInputBar = ({ scroll }: any) => {
  const [message, setMessage] = useState<string>("");
  const { chat }: any = useContext(ChatContext);
  const { currentUser }: any = useContext(AuthContext);

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      await updateDoc(doc(db, "chats", chat.chatId), {
        messages: arrayUnion({
          uid: currentUser.uid,
          text: message,
          createdAt: Timestamp.now(),
        }),
      });
    }

    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-input-bar">
      <div className="flex-left">
        <PiImage />
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleSendOnKeyPress}
          placeholder="Write a message..."
        />
      </div>
      <div className="flex-right">
        {message && (
          <IoSendSharp className="send-icon" onClick={handleSendMessage} />
        )}
        <GoSmiley />
      </div>
    </div>
  );
};
