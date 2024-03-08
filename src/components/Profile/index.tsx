"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

import { ModalTop } from "../ModalTop";
import { AppButton, SetAvatar, ModalBack } from "..";
import { ProfileBar } from "../ProfileBar";
import { StyledTextField } from "@/components";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { db } from "@/utils/firebase";
import "@/styles/components/index.scss";

export const Profile = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const profileModal = searchParams.get("profileModal");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const { currentUser } = useGetCurrentUser();

  useEffect(() => {
    setName(currentUser?.name || "");
    currentUser && typeof currentUser.bio === "string"
      ? setBio(currentUser.bio)
      : setBio("");
  }, [currentUser]);

  const handleUpdateUserData = async () => {
    const userRef = doc(db, "users", currentUser?.uid);

    await updateDoc(userRef, {
      name: name,
      bio: bio,
    });
    updateProfile(currentUser?.uid, {
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
            <ProfileBar className="profile-menu-modal">
              <SetAvatar currentUserUid={currentUser?.uid} />
            </ProfileBar>
            <div className="inputs">
              <StyledTextField
                variant="outlined"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <StyledTextField
                variant="outlined"
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={5}
                multiline
              />
            </div>
            <Link href={pathname}>
              <AppButton label="Save" onClick={handleUpdateUserData} />
            </Link>
          </div>
        </>
      )}
    </>
  );
};
