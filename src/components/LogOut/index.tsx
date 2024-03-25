import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { RiArrowLeftLine } from "react-icons/ri";

import { AppButton, ModalOverlay } from "@/components";
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
          <ModalOverlay />
          <div className="log-out-modal">
            <div className="modal-top">
              <Link href={pathname}>
                <RiArrowLeftLine />
              </Link>
              <h1>Log out</h1>
            </div>
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
