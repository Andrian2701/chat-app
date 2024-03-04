"use client";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

import { auth } from "@/api/firebase-config";

export default function Home() {
  const router = useRouter();

  const handleLogOut = () => {
    signOut(auth).then(() => {
      router.push("/sign-in");
    });
  };

  return <button onClick={handleLogOut}>Log out</button>;
}
