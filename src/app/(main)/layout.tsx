"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import { LogOut, Profile } from "@/components";
import { auth } from "@/utils/firebase";
import { SideBar } from "@/layout";
import "@/styles/main.scss";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isUserValid, setIsUserValid] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      onAuthStateChanged(auth, (user) =>
        user ? setIsUserValid(true) : router.push("/sign-in")
      );
    };

    checkAuth();
  }, []);

  if (isUserValid === true) {
    return (
      <div className="main">
        <SideBar />
        {children}
        <LogOut />
        <Profile />
      </div>
    );
  }
}
