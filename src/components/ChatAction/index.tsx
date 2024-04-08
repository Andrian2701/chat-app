"use client";
import { useContext } from "react";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  arrayRemove,
  deleteField,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { MainButton, ModalOverlay } from "@/components";
import { AuthContext } from "@/context/AuthContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { ChatContext } from "@/context/ChatContext";
import { db } from "@/utils/firebase";
import { Users } from "@/types";
import "@/styles/components/index.scss";

export const ChatAction = () => {
  const { currentUser } = useContext(AuthContext);
  const { currentUserData } = useContext(CurrentUserContext);
  const { chat } = useContext(ChatContext);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const clearChat = searchParams.get("clearChat");
  const deleteChat = searchParams.get("deleteChat");

  const handleClearChat = async () => {
    await updateDoc(doc(db, "chats", chat.chatId), {
      messages: deleteField(),
    });

    router.push(pathname);
  };

  const handleDeleteChat = async () => {
    if (!currentUserData) return;

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      chats: arrayRemove({
        uid: chat.user.uid,
        email: chat.user.email,
        name: chat.user.name,
        avatar: chat.user.avatar ? chat.user.avatar : "",
      }),
    });

    const docSnap = await getDoc(doc(db, "userChats", chat.user.uid));
    const data = docSnap.data();
    const targetChat = data?.chats.filter(
      (chat: Users) => chat.uid === currentUserData[0].uid
    );

    await updateDoc(doc(db, "userChats", chat.user.uid), {
      chats: arrayRemove({
        uid: targetChat[0].uid,
        email: targetChat[0].email,
        name: targetChat[0].name,
        avatar: targetChat[0].avatar ? targetChat[0].avatar : "",
      }),
    });
    await updateDoc(doc(db, "chats", chat.chatId), {
      messages: deleteField(),
    });

    router.push("/");
  };

  return (
    <>
      {(deleteChat || clearChat) && (
        <>
          <ModalOverlay />
          <div className="log-out">
            <p>
              Are you sure you want to delete all message history with{" "}
              {chat.user.name}?
            </p>
            <p>This action cannot be undone.</p>
            <div className="btns">
              <Link href={pathname}>
                <MainButton label="Cancel" />
              </Link>
              <MainButton
                className="main-btn-red"
                label="Delete"
                onClick={clearChat ? handleClearChat : handleDeleteChat}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
