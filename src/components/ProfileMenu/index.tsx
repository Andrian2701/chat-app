"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";
import { Avatar, Skeleton } from "@mui/material";

import { useFetchUsers } from "@/hooks/useFetchUsers";
import { auth, storage } from "@/utils/firebase";
import "@/styles/components/index.scss";

type ProfileMenuProps = {
  className: string;
  children?: any;
  onClick?: any;
};

export const ProfileMenu = ({
  className,
  children,
  onClick,
}: ProfileMenuProps) => {
  const { users, loading } = useFetchUsers();
  const [currentUserUid, setCurrentUserUid] = useState("");
  const [avatarLoad, setAvatarLoad] = useState(true);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUid(user.uid);
      }
    });
  }, []);

  const currentUser = useMemo(
    () => users.filter((user) => user.uid === currentUserUid),
    [currentUserUid, users]
  );

  const avatarPath = ref(storage, `users-avatars/${currentUserUid}`);

  useEffect(() => {
    getDownloadURL(avatarPath).then((url) => {
      setAvatar(url);
      setAvatarLoad(false);
    });
  }, [avatarPath]);

  return (
    <div className={className}>
      {loading && avatarLoad ? (
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
          {currentUser.map((user) => (
            <>
              <Link href="?profileModal=true" onClick={onClick}>
                <Avatar className="avatar" src={avatar} alt="profile">
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
