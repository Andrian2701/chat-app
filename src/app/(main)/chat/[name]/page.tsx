import { ChatWrapper } from "@/layout";

type Props = {
  params: { name: string };
};

export const generateMetadata = async ({ params }: Props) => {
  const decodedURL = decodeURI(params.name);

  return {
    title: decodedURL,
  };
};

const ChatPage = () => {
  return (
    <>
      <ChatWrapper />
    </>
  );
};

export default ChatPage;
