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
import { deleteObject, listAll, ref } from "firebase/storage";

import { MainButton, ModalOverlay } from "@/components";
import { AuthContext } from "@/context/AuthContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { ChatContext } from "@/context/ChatContext";
import { db, storage } from "@/utils/firebase";
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

    const folderRef = ref(storage, `img-messages/${chat.chatId}`);
    const fileList = await listAll(folderRef);
    const promises = [];
    for (let item of fileList.items) {
      promises.push(deleteObject(item));
    }
  };

  const handleDeleteChat = async () => {
    if (currentUserData) {
      const userChatRef = doc(db, "userChats", chat.user.uid);
      const docSnap = await getDoc(userChatRef);
      const data = docSnap.data();
      const targetChat = data?.chats.filter(
        (chat: Users) => chat.uid === currentUserData[0].uid
      );

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        chats: arrayRemove({
          uid: chat.user.uid,
          email: chat.user.email,
          name: chat.user.name,
          avatar: chat.user.avatar ? chat.user.avatar : "",
        }),
      });
      await updateDoc(userChatRef, {
        chats: arrayRemove({
          uid: targetChat[0].uid,
          email: targetChat[0].email,
          name: targetChat[0].name,
          avatar: targetChat[0].avatar ? targetChat[0].avatar : "",
        }),
      });
      handleClearChat();

      router.push("/");
    }
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
              <Link href={pathname}>
                <MainButton
                  className="main-btn-red"
                  label="Delete"
                  onClick={clearChat ? handleClearChat : handleDeleteChat}
                />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
