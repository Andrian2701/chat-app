"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { Backdrop } from "@mui/material";

import { AppButton } from "../AppButton";
import { auth } from "@/api/firebase-config";
import "@/styles/components/index.scss";

export const LogOutModal = () => {
  const [open] = useState(true);
  const searchParams = useSearchParams();
  const logOutModal = searchParams.get("logOutModal");
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    signOut(auth).then(() => {
      router.push("/sign-in");
    });
  };

  return (
    <>
      {logOutModal && (
        <>
          <Backdrop
            open={open}
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
          />
          <div className="log-out-modal">
            <h1>Log out of SyncTalk</h1>
            <p>
              Logging out now will end your current session. You can always log
              back in at any time to continue where you left off.
            </p>
            <div className="btns">
              <AppButton
                className="app-btn-black"
                label="Log out"
                onClick={handleLogOut}
              />
              <Link href={pathname}>
                <AppButton className="app-btn-white" label="Cancel" />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
