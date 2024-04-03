"use client";
import { useContext } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { Divider } from "@mui/material";
import { RiArrowLeftLine } from "react-icons/ri";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import {
  IoBookmarkOutline,
  IoImageOutline,
  IoVideocamOutline,
  IoLinkOutline,
  IoHandRightOutline,
} from "react-icons/io5";

import { EditChat, ModalOverlay, ProfileBar } from "@/components";
import { ChatContext } from "@/context/ChatContext";
import "@/styles/components/index.scss";

export const UserInfo = () => {
  const { chat } = useContext(ChatContext);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const userInfo = searchParams.get("userInfo");

  return (
    <>
      {userInfo && (
        <>
          <ModalOverlay />
          <div className="user-info">
            <div className="flex-top">
              <Link href={pathname}>
                <RiArrowLeftLine />
              </Link>
              <h1>User info</h1>
            </div>
            <div className="flex-bottom">
              <div className="flex-one">
                <ProfileBar className="user-profile-menu" data={[chat?.user]} />
              </div>
              <Divider className="big-hr" />
              <div className="flex-two">
                <div className="email">
                  <IoIosInformationCircleOutline />
                  <div>
                    <p>{chat?.user.email}</p>
                    <label>Email</label>
                  </div>
                </div>
                <Divider variant="inset" />
                <Link href={pathname}>Send message</Link>
              </div>
              <Divider className="big-hr" />
              <div className="flex-three">
                <Link href="#">
                  <IoBookmarkOutline />
                  <p>1 saved message</p>
                </Link>
                <Link href="#">
                  <IoImageOutline />
                  <p>10 photos</p>
                </Link>
                <Link href="#">
                  <IoVideocamOutline />
                  <p>20 videos</p>
                </Link>
                <Link href="#">
                  <IoLinkOutline />
                  <p>80 shared links</p>
                </Link>
              </div>
              <Divider className="big-hr" />
              <div className="flex-four">
                <Link href="?editChat=true">
                  <GoPencil />
                  <p>Edit chat</p>
                </Link>
                <Link href="?deleteChat=true">
                  <AiOutlineDelete />
                  <p>Delete chat</p>
                </Link>
                <Link href="#" style={{ color: "#d0312d" }}>
                  <IoHandRightOutline />
                  <p>Block chat</p>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
