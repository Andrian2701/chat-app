import { Roboto } from "next/font/google";

import { AuthContextProvider } from "@/context/AuthContext";
import { UsersContextProvider } from "@/context/UsersContext";
import { ChatContextProvider } from "@/context/ChatContext";
import { AlertContextProvider } from "@/context/AlertContext";
import "@/styles/index.scss";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--var-roboto",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <AuthContextProvider>
        <UsersContextProvider>
          <ChatContextProvider>
            <AlertContextProvider>
              <body className={roboto.variable}>{children}</body>
            </AlertContextProvider>
          </ChatContextProvider>
        </UsersContextProvider>
      </AuthContextProvider>
    </html>
  );
};

export default RootLayout;
