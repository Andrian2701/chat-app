import { Roboto } from "next/font/google";

import { AuthContextProvider } from "@/context/AuthContext";
import { ChatContextProvider } from "@/context/ChatContext";
import "@/styles/main.scss";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--var-roboto",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <ChatContextProvider>
          <body className={roboto.variable}>{children}</body>
        </ChatContextProvider>
      </AuthContextProvider>
    </html>
  );
}
