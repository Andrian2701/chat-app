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

type Props = {
  users: Users[] | undefined;
  loading: boolean;
};

export const ChatList = ({ users, loading }: Props) => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch }: any = useContext(ChatContext);

  const handleUserSelect = async (user: Users) => {
    if (!currentUser) return;

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    const chatsRef = doc(db, "chats", combinedId);
    const res = await getDoc(chatsRef);

    if (!res.exists()) {
      await setDoc(chatsRef, { messages: [] });
    }
  };

  const handleChatSelect = (u: any) =>
    dispatch({ type: "CHANGE_USER", payload: u });

  return (
    <div className="chat-list">
      {loading ? (
        <>
          {Array.from({ length: 11 }).map((_, index) => (
            <div className="chat" key={index}>
              <div className="flex-left">
                <Skeleton
                  variant="circular"
                  animation="wave"
                  sx={{ width: "3.2rem", height: "3.2rem" }}
                />
              </div>
              <div className="flex-right">
                <div className="flex-top">
                  <p className="name">
                    <Skeleton variant="text" animation="wave" width={31.12} />
                  </p>
                  <p className="time">
                    <Skeleton variant="text" animation="wave" width={35.84} />
                  </p>
                </div>
                <div className="flex-bottom">
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
                key={user.uid}
                href={`/chat/${user.name}`}
                className="chat"
                onClick={() => {
                  handleUserSelect(user), handleChatSelect(user);
                }}
              >
                <div className="flex-left">
                  <Avatar src={user.avatar} alt="avatar" />
                </div>
                <div className="flex-right">
                  <div className="flex-top">
                    <p className="name">{user.name}</p>
                    <p className="time">17:00</p>
                  </div>
                  <div className="flex-bottom">
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
