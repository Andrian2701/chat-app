"use client";
import { useState, useContext } from "react";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import Picker from "emoji-picker-react";
import { PiImage } from "react-icons/pi";
import { GoSmiley } from "react-icons/go";
import { IoSendSharp } from "react-icons/io5";
import { VscMic } from "react-icons/vsc";

import { ChatContext } from "@/context/ChatContext";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/utils/firebase";
import "@/styles/layout/index.scss";

type Props = {
  scroll: React.RefObject<HTMLDivElement>;
};

export const ChatInputBar = ({ scroll }: Props) => {
  const { currentUser } = useContext(AuthContext);
  const { chat }: any = useContext(ChatContext);
  const [message, setMessage] = useState<string>("");
  const [showPicker, setShowPicker] = useState(false);

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      await updateDoc(doc(db, "chats", chat.chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          uid: currentUser.uid,
          text: message,
          createdAt: Timestamp.now(),
        }),
      });
    }

    setMessage("");

    if (scroll.current !== null) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOnEmojiClick = (emojiObj: { emoji: string }) => {
    setMessage((prevVal) => prevVal + emojiObj.emoji);
    setShowPicker(false);
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
        <GoSmiley onClick={() => setShowPicker((val) => !val)} />
        {showPicker && (
          <Picker className="emoji-picker" onEmojiClick={handleOnEmojiClick} />
        )}
        {message ? (
          <IoSendSharp className="send-icon" onClick={handleSendMessage} />
        ) : (
          <VscMic />
        )}
      </div>
    </div>
  );
};
