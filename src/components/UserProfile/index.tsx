"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import { useSearchParams, usePathname } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import { ModalTop } from "../ModalTop";
import { AppButton, SetAvatar, ModalBack } from "..";
import { ProfileMenu } from "../ProfileMenu";
import { StyledTextField } from "@/layout";
import { auth, db } from "@/utils/firebase";
import "@/styles/components/index.scss";

export const UserProfile = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const profileModal = searchParams.get("profileModal");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("hello");
  const { users } = useFetchUsers();
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

  useEffect(() => {
    setName(currentUser[0]?.name);
    setBio(currentUser[0]?.bio);
  }, [currentUser]);

  const handleUpdateUserData = async () => {
    const userRef = doc(db, "users", currentUserUid);

    await updateDoc(userRef, {
      name: name,
      bio: bio,
    });
    updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  return (
    <>
      {profileModal && (
        <>
          <ModalBack />
          <div className="profile-modal">
            <ModalTop pathname={pathname} label="Profile" />
            <ProfileMenu className="profile-menu-modal">
              <SetAvatar currentUserUid={currentUserUid} />
            </ProfileMenu>
            <div className="inputs">
              <StyledTextField
                variant="outlined"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <StyledTextField
                variant="outlined"
                label="Bio"
                multiline
                rows={5}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <Link href={pathname}>
              <AppButton
                className="app-btn-black"
                label="Save"
                onClick={handleUpdateUserData}
              />
            </Link>
          </div>
        </>
      )}
    </>
  );
};
