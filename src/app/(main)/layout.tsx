"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import { LogOut, Profile } from "@/components/index";
import { auth } from "@/utils/firebase";

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
      <>
        {children}
        <LogOut />
        <Profile />
      </>
    );
  }
}
