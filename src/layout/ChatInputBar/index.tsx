"use client";
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Picker from "emoji-picker-react";
import { PiImage } from "react-icons/pi";
import { GoSmiley } from "react-icons/go";
import { IoSendSharp, IoClose } from "react-icons/io5";
import { VscMic } from "react-icons/vsc";

import { ChatContext } from "@/context/ChatContext";
import { AuthContext } from "@/context/AuthContext";
import { db, storage, metadata } from "@/utils/firebase";
import { Chat } from "@/types";
import "@/styles/layout/index.scss";

export const ChatInputBar = ({
  scroll,
}: {
  scroll: React.RefObject<HTMLDivElement>;
}) => {
  const { currentUser } = useContext(AuthContext);
  const { chat }: Chat = useContext(ChatContext);
  const [textMessage, setTextMessage] = useState<string>("");
  const [imgMessage, setImgMessage] = useState<File | null>(null);
  const [imgURL, setImgURL] = useState<string>("");
  const [showPicker, setShowPicker] = useState<boolean>(false);

  useEffect(() => {
    const handleUploadImage = async () => {
      if (imgMessage) {
        const storageRef = ref(
          storage,
          `img-messages/${chat.chatId}/${uuidv4()}`
        );
        const reader = new FileReader();

        reader.onload = async (e) => {
          if (!e.target) return;
          const target = e.target as FileReader;
          if (!target.result) return;
          const blob = new Blob([target.result], { type: imgMessage.type });
          const snapshot = await uploadBytes(storageRef, blob, metadata);
          const imgURL = await getDownloadURL(snapshot.ref);
          setImgURL(imgURL);
        };
        reader.readAsArrayBuffer(imgMessage);
      }
    };

    handleUploadImage();
  }, [imgMessage]);

  const handleSendMessage = async () => {
    imgURL
      ? await updateDoc(doc(db, "chats", chat.chatId), {
          messages: arrayUnion({
            id: uuidv4(),
            uid: currentUser.uid,
            img: imgURL,
            text: textMessage,
            createdAt: Timestamp.now(),
          }),
        })
      : textMessage.trim() !== "" &&
        (await updateDoc(doc(db, "chats", chat.chatId), {
          messages: arrayUnion({
            id: uuidv4(),
            uid: currentUser.uid,
            text: textMessage,
            createdAt: Timestamp.now(),
          }),
        }));

    setTextMessage("");
    setImgURL("");
    setImgMessage(null);

    scroll.current !== null &&
      scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleOnEmojiClick = (emojiObj: { emoji: string }) => {
    setTextMessage((prevVal) => prevVal + emojiObj.emoji);
    setShowPicker(false);
  };

  return (
    <div className={imgURL ? "chat-input-two" : "chat-input-one"}>
      {imgURL && (
        <div className="help-bar">
          <div className="flex-left">
            <Image src={imgURL} alt="textMessage" width={35} height={35} />
            <span>
              <p className="action">Send image</p>
              <p>imgMessage</p>
            </span>
          </div>
          <IoClose onClick={() => setImgURL("")} />
        </div>
      )}
      <div className="input">
        <div className="flex-left">
          <label>
            <PiImage />
            <input
              type="file"
              onChange={(e) => {
                if (!e.target || !e.target.files) return;
                setImgMessage(e.target.files[0]);
              }}
            />
          </label>
          <input
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            onKeyDown={handleSendOnKeyPress}
            placeholder="Write a message..."
          />
        </div>
        <div className="flex-right">
          <GoSmiley onClick={() => setShowPicker((val) => !val)} />
          {showPicker && (
            <Picker
              className="emoji-picker"
              onEmojiClick={handleOnEmojiClick}
            />
          )}
          {textMessage || imgURL ? (
            <IoSendSharp className="send-icon" onClick={handleSendMessage} />
          ) : (
            <VscMic />
          )}
        </div>
      </div>
    </div>
  );
};
