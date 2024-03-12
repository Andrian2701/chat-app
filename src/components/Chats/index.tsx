import { Avatar } from "@mui/material";

import "@/styles/components/index.scss";

export const Chats = () => {
  return (
    <div className="chats-list">
      <div className="chat">
        <div className="avatar-container">
          <Avatar />
        </div>
        <div className="text">
          <div className="top">
            <p className="name">Tanya</p>
            <p className="time">17:00</p>
          </div>
          <div className="bottom">
            <p>How was your weekend?</p>
          </div>
        </div>
      </div>
    </div>
  );
};
