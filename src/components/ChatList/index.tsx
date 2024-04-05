import Link from "next/link";
import { useContext } from "react";
import { Avatar } from "@mui/material";

import { CHANGE_USER, ChatContext } from "@/context/ChatContext";
import { LoadingSkeleton } from "@/components";
import "@/styles/components/index.scss";

type Props = {
  chats: any;
  loading: boolean;
};

export const ChatList = ({ chats, loading }: Props) => {
  const { dispatch }: any = useContext(ChatContext);

  const handleChatSelect = (u: any) =>
    dispatch({ type: CHANGE_USER, payload: u });

  return (
    <div className="chats">
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {chats &&
            chats.map((chat: any) => (
              <Link
                key={chat.uid}
                href={`/chat/${chat.name}`}
                className="chat"
                onClick={() => handleChatSelect(chat)}
              >
                <div className="flex-left">
                  <Avatar src={chat.avatar} alt="avatar" />
                </div>
                <div className="flex-right">
                  <div className="flex-top">
                    <p className="name">{chat.name}</p>
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
