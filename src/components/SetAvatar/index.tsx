"use client";
import { useState, useEffect } from "react";
import { IoCameraOutline } from "react-icons/io5";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

import { storage } from "@/utils/firebase";
import "@/styles/components/index.scss";

type SetAvatarProps = {
  currentUserUid: string;
};

const metadata = {
  contentType: "image/jpg",
};

export const SetAvatar = ({ currentUserUid }: SetAvatarProps) => {
  const [avatarUpload, setAvatarUpload] = useState<File | null>(null);
  const avatarRef = storageRef(storage, `users-avatars/${currentUserUid}`);

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
