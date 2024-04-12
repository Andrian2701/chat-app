import { useContext } from "react";
import Image from "next/image";

import { AuthContext } from "@/context/AuthContext";
import { Messages } from "@/types";
import "@/styles/components/index.scss";

type Props = {
  data: Messages;
};

export const Message = ({ data }: Props) => {
  const { currentUser } = useContext(AuthContext);

  const handleFormatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const mDate = handleFormatTime(
    new Date(data.createdAt.seconds * 1000 + data.createdAt.nanoseconds / 1e6)
  );

  return (
    <div
      className={currentUser && data.uid === currentUser.uid ? "sender-m" : "m"}
    >
      {data.img && (
        <div
          className={data.uid === currentUser.uid ? "sender-img-m" : "img-m"}
        >
          <span>
            <div>{mDate}</div>
          </span>
          <Image src={data.img} alt="img" width={250} height={450} />
        </div>
      )}
      {data.text !== "" && (
        <div className="text-m">
          <p>{data.text}</p>
          <span>
            <div>{mDate}</div>
          </span>
        </div>
      )}
    </div>
  );
};
