"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { Avatar, Skeleton } from "@mui/material";

import { useGetUsers } from "@/hooks/useGetUsers";
import { auth } from "@/utils/firebase";
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
  const [currentUserUid, setCurrentUserUid] = useState<string>("");
  const { users, loading } = useGetUsers();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUid(user.uid);
      }
    });
  }, []);

  const currentUser = useMemo(
    () => users?.filter((user) => user.uid === currentUserUid),
    [users, currentUserUid]
  );

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
          {currentUser?.map((user) => (
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
