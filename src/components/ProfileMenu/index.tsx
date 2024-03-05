"use client";
import { useState, useEffect } from "react";
import { useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Avatar, Skeleton } from "@mui/material";

import { useFetchUsers } from "@/hooks/useFetchUsers";
import { auth } from "@/api/firebase-config";
import "@/styles/components/index.scss";

export const ProfileMenu = () => {
  const { users, loading } = useFetchUsers();
  const [currentUserUid, setCurrentUserUid] = useState("");

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

  return (
    <div className="profile-menu">
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
          {currentUser.map((user) => (
            <>
              <Avatar alt="profile" className="avatar">
                {user.name.charAt(0)}
              </Avatar>
              <p>{user.name}</p>
            </>
          ))}
        </>
      )}
    </div>
  );
};
