"use client";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import { signOut } from "firebase/auth";

import { ModalBack, ModalTop } from "..";
import { AppButton } from "..";
import { auth } from "@/utils/firebase";
import "@/styles/components/index.scss";

export const LogOut = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const logOutModal = searchParams.get("logOutModal");

  const handleLogOut = () => {
    signOut(auth).then(() => {
      router.push("/sign-in");
    });
  };

  return (
    <>
      {logOutModal && (
        <>
          <ModalBack />
          <div className="log-out-modal">
            <ModalTop pathname={pathname} label="Log out" />
            <p>
              Logging out now will end your current session. You can always log
              back in at any time to continue where you left off.
            </p>
            <AppButton label="Log out" onClick={handleLogOut} />
          </div>
        </>
      )}
    </>
  );
};
