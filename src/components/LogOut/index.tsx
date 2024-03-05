import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { IoLogOutOutline } from "react-icons/io5";

import { auth } from "@/api/firebase-config";
import "@/styles/components/index.scss";

export const LogOut = () => {
  const router = useRouter();

  const handleLogOut = () => {
    signOut(auth).then(() => {
      router.push("/sign-in");
    });
  };

  return (
    <div className="log-out" onClick={handleLogOut}>
      <IoLogOutOutline />
    </div>
  );
};
