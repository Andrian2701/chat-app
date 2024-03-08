import Image from "next/image";
import { signInWithRedirect } from "firebase/auth";

import { auth, provider } from "@/utils/firebase";
import googleIcon from "@/assets/google.png";
import "@/styles/components/index.scss";

type GoogleButtonProps = {
  label: string;
};

export const GoogleAuth = ({ label }: GoogleButtonProps) => {
  const handleAuthWithGoogle = () => signInWithRedirect(auth, provider);

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
