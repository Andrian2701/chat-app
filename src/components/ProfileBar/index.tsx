"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { StorageReference, getDownloadURL, ref } from "firebase/storage";
import { Avatar, Skeleton } from "@mui/material";

import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { storage } from "@/utils/firebase";
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
  const { currentUser, loading } = useGetCurrentUser();
  const [avatarLoad, setAvatarLoad] = useState<boolean>(true);
  const [avatar, setAvatar] = useState<string>("");

  const avatarPath: StorageReference = ref(
    storage,
    `users-avatars/${currentUser?.uid}`
  );

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
          <Link
            href="?profileModal=true"
            key={currentUser?.name}
            onClick={onClick}
          >
            <Avatar className="avatar" src={avatar} alt="profile">
              {currentUser?.name.charAt(0)}
            </Avatar>
          </Link>
          {children}
          <p>{currentUser?.name}</p>
        </>
      )}
    </div>
  );
};
