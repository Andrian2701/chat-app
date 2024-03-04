import Image from "next/image";
import { signInWithRedirect } from "firebase/auth";

import { auth, provider } from "@/api/firebase-config";
import googleIcon from "@/assets/google.png";
import "@/styles/components/index.scss";

type GoogleButtonProps = {
  label: string;
};

const GoogleButton = ({ label }: GoogleButtonProps) => {
  const handleAuthWithGoogle = () => signInWithRedirect(auth, provider);

  return (
    <button type="button" className="google-btn" onClick={handleAuthWithGoogle}>
      <Image width={20} height={20} src={googleIcon} alt="google-icon" />
      {label} with Google
    </button>
  );
};

export default GoogleButton;
