"use client";
import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";

import "@/styles/layout/index.scss";

export const ChatTopBar = () => {
  return (
    <div className="chat-top-bar">
      <div className="flex-left">
        <Link href="/" className="go-back">
          <RiArrowLeftLine />
        </Link>
        <p>Name</p>
      </div>
      <div className="flex-right">
        <IoIosSearch />
        <HiOutlineDotsVertical />
      </div>
    </div>
  );
};
