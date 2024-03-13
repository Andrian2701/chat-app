"use client";

import { Avatar, Skeleton } from "@mui/material";

import { Users } from "@/layout";
import "@/styles/components/index.scss";

type ChatsProps = {
  users: Users[] | undefined;
  loading: boolean;
};

export const Chats = ({ users, loading }: ChatsProps) => {
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
                    <Skeleton
                      variant="text"
                      animation="wave"
                      sx={{ width: 31.12, height: 19 }}
                    />
                  </p>
                  <p className="time">
                    <Skeleton
                      variant="text"
                      animation="wave"
                      sx={{ width: 35.84, height: 17 }}
                    />
                  </p>
                </div>
                <div className="bottom">
                  <p>
                    <Skeleton
                      variant="text"
                      animation="wave"
                      sx={{ height: 17 }}
                    />
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
              <div className="chat" key={user.uid}>
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
              </div>
            ))}
        </>
      )}
    </div>
  );
};
