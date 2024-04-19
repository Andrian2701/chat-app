import { useContext } from "react";
import Image from "next/image";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";

import { PopupMenu } from "@/components";
import { AuthContext } from "@/context/AuthContext";
import { ChatContext } from "@/context/ChatContext";
import { useMenuState } from "@/hooks/useMenuState";
import { messageMenuItems } from "@/utils/const";
import { db } from "@/utils/firebase";
import { Messages } from "@/types";
import "@/styles/components/index.scss";

type Props = {
  mData: Messages;
};

export const Message = ({ mData }: Props) => {
  const { currentUser } = useContext(AuthContext);
  const { chat } = useContext(ChatContext);
  const { handleClick, anchorEl, open, handleClose } = useMenuState();

  const handleFormatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const handleDeleteMessage = async () => {
    const ref = doc(db, "chats", chat.chatId);
    await updateDoc(ref, {
      messages: arrayRemove({
        id: mData.id,
        uid: mData.uid,
        text: mData.text,
        createdAt: mData.createdAt,
        img: mData.img ? mData.img : "",
      }),
    });
  };

  const mDate = handleFormatTime(
    new Date(mData.createdAt.seconds * 1000 + mData.createdAt.nanoseconds / 1e6)
  );
  const className =
    currentUser && mData.uid === currentUser.uid ? "sender-m" : "m";

  return (
    <div className={className}>
      {mData.img && (
        <div
          className={mData.uid === currentUser.uid ? "sender-img-m" : "img-m"}
        >
          <span>
            <div>{mDate}</div>
          </span>
          <Image
            src={mData.img}
            alt="img"
            width={250}
            height={450}
            onClick={handleClick}
          />
        </div>
      )}
      {mData.text !== "" && (
        <div className="text-m" onClick={handleClick}>
          <p>{mData.text}</p>
          <span>
            <div>{mDate}</div>
          </span>
        </div>
      )}
      <PopupMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        handleDeleteMessage={handleDeleteMessage}
        menuItems={messageMenuItems}
        mUid={mData.uid}
        className={className}
      />
    </div>
  );
};
