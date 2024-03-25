"use client";
import { useContext } from "react";

import { AuthContext } from "@/context/AuthContext";

type Message = {
  uid: string;
  text: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
};

export const Message = ({ text, createdAt, uid }: Message) => {
  const { currentUser } = useContext(AuthContext);

  const handleFormatTime = (date: any) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className={currentUser && uid === currentUser.uid ? "sender-m" : "m"}>
      <p>
        <span className="m-text">{text}</span>
        <span className="m-date">
          <div>
            {handleFormatTime(
              new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1e6)
            )}
          </div>
        </span>
      </p>
    </div>
  );
};
