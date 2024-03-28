import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { Button } from "@mui/material";
import { RiArrowLeftLine } from "react-icons/ri";

import { ModalOverlay } from "@/components";
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
          <div className="log-out">
            <div className="log-out-top">
              <h1>Log out</h1>
            </div>
            <p>Are you sure you want to LOG OUT of Evertalk app?</p>
            <div className="btns">
              <Link href={pathname}>
                <Button disableRipple>Cancel</Button>
              </Link>
              <Button onClick={handleLogOut} disableRipple>
                Log out
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
