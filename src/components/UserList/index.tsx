import Link from "next/link";
import { useContext } from "react";
import { setDoc, getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Avatar } from "@mui/material";

import { LoadingSkeleton } from "@/components";
import { CHANGE_USER, ChatContext } from "@/context/ChatContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { db } from "@/utils/firebase";
import { Users } from "@/types";
import "@/styles/components/index.scss";

type Props = {
  users: Users[] | undefined;
  loading: boolean;
};

export const UserList = ({ users, loading }: Props) => {
  const { currentUserData } = useContext(CurrentUserContext);
  const { dispatch }: any = useContext(ChatContext);

  const handleChatSelect = (u: any) =>
    dispatch({ type: CHANGE_USER, payload: u });

  const handleUserSelect = async (user: Users) => {
    if (!currentUserData) return;

    const combinedId =
      currentUserData[0].uid > user.uid
        ? currentUserData[0].uid + user.uid
        : user.uid + currentUserData[0].uid;

    const currentUserChatsRef = doc(db, "userChats", currentUserData[0].uid);
    const userChatsRef = doc(db, "userChats", user.uid);
    const chatsRef = doc(db, "chats", combinedId);
    const currentUserChats = await getDoc(currentUserChatsRef);
    const userChats = await getDoc(userChatsRef);
    const chats = await getDoc(chatsRef);

    if (!currentUserChats.exists()) {
      await setDoc(currentUserChatsRef, { chats: [] });
    }
    if (!userChats.exists()) {
      await setDoc(userChatsRef, { chats: [] });
    }
    if (!chats.exists()) {
      await setDoc(chatsRef, { messages: [] });
    }

    await updateDoc(currentUserChatsRef, {
      chats: arrayUnion({
        uid: user.uid,
        email: user.email,
        name: user.name,
        avatar: user.avatar ? user.avatar : "",
      }),
    });
    await updateDoc(userChatsRef, {
      chats: arrayUnion({
        uid: currentUserData[0].uid,
        email: currentUserData[0].email,
        name: currentUserData[0].name,
        avatar: currentUserData[0].avatar ? currentUserData[0].avatar : "",
      }),
    });
  };

  return (
    <div className="users">
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {users &&
            users.map((user) => (
              <Link
                className="chat"
                key={user.uid}
                href={`/chat/${user.name}`}
                onClick={() => {
                  handleUserSelect(user);
                  handleChatSelect(user);
                }}
              >
                <div className="flex-left">
                  <Avatar src={user.avatar} alt="avatar" />
                </div>
                <div className="flex-right">
                  <div className="flex-top">
                    <p className="name">{user.name}</p>
                  </div>
                </div>
              </Link>
            ))}
        </>
      )}
    </div>
  );
};
