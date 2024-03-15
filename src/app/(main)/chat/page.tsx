import Link from "next/link";
import Image from "next/image";
import { RiArrowLeftLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { PiImage } from "react-icons/pi";
import { GoSmiley } from "react-icons/go";

import chatImg from "@/assets/chat.jpeg";
import "@/styles/pages/index.scss";

const ChatPage = () => {
  return (
    <div className="chat-page">
      <div className="chat-top-bar">
        <div className="chat-name">
          <Link href="/" className="go-back">
            <RiArrowLeftLine />
          </Link>
          <p>Name</p>
        </div>
        <div className="top-icons">
          <IoIosSearch />
          <HiOutlineDotsVertical />
        </div>
      </div>
      <div className="chat-field">
        <Image src={chatImg} alt="chat-theme" />
      </div>
      <div className="chat-bottom-bar">
        <div className="share">
          <PiImage />
          <input className="chat-input" placeholder="Write a message..." />
        </div>
        <GoSmiley />
      </div>
    </div>
  );
};

export default ChatPage;
