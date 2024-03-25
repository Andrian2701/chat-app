"use client";
import { useMemo, useContext } from "react";
import Link from "next/link";
import { Avatar, Skeleton } from "@mui/material";

import { AuthContext } from "@/context/AuthContext";
import { UsersContext } from "@/context/UsersContext";
import "@/styles/components/index.scss";

type ProfileMenuProps = {
  className: string;
  children?: any;
  onClick?: any;
};

export const ProfileBar = ({
  className,
  children,
  onClick,
}: ProfileMenuProps) => {
  const { currentUser } = useContext(AuthContext);
  const { users, loading } = useContext(UsersContext);

  const currentUserData = useMemo(() => {
    return currentUser
      ? users?.filter((user) => user.uid === currentUser.uid)
      : null;
  }, [users, currentUser]);

  return (
    <div className={className}>
      {loading ? (
        <>
          <Skeleton
            variant="circular"
            animation="wave"
            sx={{ width: "3.8rem", height: "3.8rem" }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            sx={{ width: 68, height: 19 }}
          />
        </>
      ) : (
        <>
          {currentUserData?.map((user) => (
            <>
              <Link href="?profileModal=true" key={user.name} onClick={onClick}>
                <Avatar className="avatar" src={user.avatar} alt="profile">
                  {user.name.charAt(0)}
                </Avatar>
              </Link>
              {children}
              <p>{user.name}</p>
            </>
          ))}
        </>
      )}
    </div>
  );
};
