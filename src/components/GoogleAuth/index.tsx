"use client";
import { useContext, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { AlertContext, SET_ALERT } from "@/context/AlertContext";
import { auth, provider, db } from "@/utils/firebase";
import googleIcon from "@/assets/google.png";
import "@/styles/components/index.scss";

export const GoogleAuth = ({ label }: { label: string }) => {
  const { dispatch } = useContext(AlertContext);
  const router = useRouter();

  const handleAuthWithGoogle = () => signInWithRedirect(auth, provider);

  useEffect(() => {
    const handleRedirect = async () => {
      const res = await getRedirectResult(auth);
      const user = res?.user;
      if (!user) return;

      const usersRef = doc(db, "users", user.uid);
      const userData = await getDoc(usersRef);

      if (!userData.exists()) {
        await setDoc(usersRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
        await setDoc(doc(db, "userChats", user.uid), {});

        router.push("/profile-setup");
      } else {
        dispatch({
          type: SET_ALERT,
          payload: "Successfull authentification.",
        });

        setTimeout(() => {
          dispatch({
            type: SET_ALERT,
            payload: null,
          });
          router.push("/");
        }, 2000);
      }
    };

    handleRedirect();
  }, [router]);

  return (
    <>
      <button
        type="button"
        className="google-auth-btn"
        onClick={handleAuthWithGoogle}
      >
        <Image src={googleIcon} alt="google-icon" width={20} height={20} />
        <p>{label} with Google</p>
      </button>
    </>
  );
};
