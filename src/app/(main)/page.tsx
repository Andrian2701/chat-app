import Image from "next/image";

import chat from "@/assets/chat.jpeg";
import "@/styles/pages/index.scss";

const StartPage = () => {
  return (
    <div className="select-chat-page">
      <p>Select a chat to start talking</p>
      <Image src={chat} alt="chat-theme" />
    </div>
  );
};

export default StartPage;
