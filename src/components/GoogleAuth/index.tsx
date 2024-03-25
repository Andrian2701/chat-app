"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, provider, db } from "@/utils/firebase";
import googleIcon from "@/assets/google.png";
import "@/styles/components/index.scss";

type Props = {
  label: string;
};

export const GoogleAuth = ({ label }: Props) => {
  const router = useRouter();

  const handleAuthWithGoogle = () => {
    signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      const user = result?.user;

      setDoc(doc(db, "users", user?.uid), {
        uid: user?.uid,
        name: user?.displayName,
        email: user?.email,
      });
      router.push("/setup-profile");
    });
  }, []);

  return (
    <button
      type="button"
      className="google-auth-btn"
      onClick={handleAuthWithGoogle}
    >
      <Image src={googleIcon} alt="google-icon" width={20} height={20} />
      <p>{label} with Google</p>
    </button>
  );
};
