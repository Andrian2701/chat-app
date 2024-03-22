"use client";
import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";

export const ChatTopBar = () => {
  return (
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
  );
};
