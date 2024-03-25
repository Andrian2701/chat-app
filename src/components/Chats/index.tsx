"use client";
import Link from "next/link";
import { useContext } from "react";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { Avatar, Skeleton } from "@mui/material";

import { ChatContext } from "@/context/ChatContext";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/utils/firebase";
import { Users } from "@/types";
import "@/styles/components/index.scss";

type ChatsProps = {
  users: Users[] | undefined;
  loading: boolean;
};

export const Chats = ({ users, loading }: ChatsProps) => {
  const { dispatch }: any = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleChatSelect = async (user: Users) => {
    if (!currentUser) return;

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }
    } catch (err) {}
  };

  const handleSelect = (u: any) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats-list">
      {loading ? (
        <>
          {Array.from({ length: 11 }).map((_, index) => (
            <div className="chat" key={index}>
              <div className="avatar-container">
                <Skeleton
                  variant="circular"
                  animation="wave"
                  sx={{ width: "3.2rem", height: "3.2rem" }}
                />
              </div>
              <div className="text">
                <div className="top">
                  <p className="name">
                    <Skeleton variant="text" animation="wave" width={31.12} />
                  </p>
                  <p className="time">
                    <Skeleton variant="text" animation="wave" width={35.84} />
                  </p>
                </div>
                <div className="bottom">
                  <p>
                    <Skeleton variant="text" animation="wave" />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {users &&
            users.map((user) => (
              <Link
                href={`/chat/${user.name}`}
                className="chat"
                key={user.uid}
                onClick={() => {
                  handleChatSelect(user), handleSelect(user);
                }}
              >
                <div className="avatar-container">
                  <Avatar src={user.avatar} alt="avatar" />
                </div>
                <div className="text">
                  <div className="top">
                    <p className="name">{user.name}</p>
                    <p className="time">17:00</p>
                  </div>
                  <div className="bottom">
                    <p>How was your weekend?</p>
                  </div>
                </div>
              </Link>
            ))}
        </>
      )}
    </div>
  );
};
