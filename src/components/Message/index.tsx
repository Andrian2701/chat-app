import { useContext } from "react";

import { AuthContext } from "@/context/AuthContext";
import { ChatMessage } from "@/types";
import "@/styles/components/index.scss";

export const Message = ({ data }: ChatMessage) => {
  const { currentUser } = useContext(AuthContext);

  const handleFormatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div
      className={currentUser && data.uid === currentUser.uid ? "sender-m" : "m"}
    >
      <p>
        <span className="m-text">{data.text}</span>
        <span className="m-date">
          <div>
            {handleFormatTime(
              new Date(
                data.createdAt.seconds * 1000 + data.createdAt.nanoseconds / 1e6
              )
            )}
          </div>
        </span>
      </p>
    </div>
  );
};
