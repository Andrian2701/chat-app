import Head from "next/head";
import { Roboto } from "next/font/google";
import { Metadata } from "next";

import { AuthContextProvider } from "@/context/AuthContext";
import { UsersContextProvider } from "@/context/UsersContext";
import { CurrentUserContextProvider } from "@/context/CurrentUserContext";
import { ChatContextProvider } from "@/context/ChatContext";
import { AlertContextProvider } from "@/context/AlertContext";
import "@/styles/base/index.scss";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--var-roboto",
});

export const metadata: Metadata = {
  title: "evertalk",
  description: "Experience evertalk app with our user-friendly design",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon.ico" sizes="any" />
      </Head>
      <AuthContextProvider>
        <CurrentUserContextProvider>
          <UsersContextProvider>
            <ChatContextProvider>
              <AlertContextProvider>
                <body className={roboto.variable}>{children}</body>
              </AlertContextProvider>
            </ChatContextProvider>
          </UsersContextProvider>
        </CurrentUserContextProvider>
      </AuthContextProvider>
    </html>
  );
};

export default RootLayout;
