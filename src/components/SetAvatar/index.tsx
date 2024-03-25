"use client";
import { useState, useEffect, useContext } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

import { AuthContext } from "@/context/AuthContext";
import { db, storage } from "@/utils/firebase";
import "@/styles/components/index.scss";

const metadata = {
  contentType: "image/jpg",
};

export const SetAvatar = () => {
  const { currentUser } = useContext(AuthContext);
  const [avatarUpload, setAvatarUpload] = useState<File | null>(null);
  const avatarRef = storageRef(storage, `users-avatars/${currentUser.uid}`);

  const handleUploadAvatar = async () => {
    if (!avatarUpload) return;

    const reader = new FileReader();

    reader.onload = async (e) => {
      if (!e.target) return;
      const target = e.target as FileReader;
      if (!target.result) return;
      const blob = new Blob([target.result], { type: avatarUpload.type });
      const snapshot = await uploadBytes(avatarRef, blob, metadata);
      const url = await getDownloadURL(snapshot.ref);

      await updateProfile(currentUser, {
        photoURL: url,
      });
      await updateDoc(doc(db, "users", currentUser.uid), {
        avatar: url,
      });
    };

    reader.readAsArrayBuffer(avatarUpload);
  };

  useEffect(() => {
    handleUploadAvatar();
  }, [avatarUpload]);

  return (
    <label className="set-avatar">
      <IoCameraOutline className="set-icon" />
      <input
        type="file"
        onChange={(e) => {
          if (!e.target || !e.target.files) return;
          setAvatarUpload(e.target.files[0]);
        }}
      />
    </label>
  );
};
