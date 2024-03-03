import Image from "next/image";
import { signInWithRedirect } from "firebase/auth";

import { auth, provider } from "@/api/firebase-config";
import googleIcon from "@/assets/google.png";
import "@/styles/components/index.scss";

const GoogleButton = () => {
  const handleAuthWithGoogle = () => signInWithRedirect(auth, provider);

  return (
    <button type="button" className="google-btn" onClick={handleAuthWithGoogle}>
      <Image width={20} height={20} src={googleIcon} alt="google-icon" />
      Sign up with Google
    </button>
  );
};

export default GoogleButton;
