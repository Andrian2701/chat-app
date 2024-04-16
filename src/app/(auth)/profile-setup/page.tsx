import { ProfileSetup } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile setup",
  description:
    "Personalize your experience with our user-friendly profile setup",
};

const ProfileSetupPage = () => {
  return (
    <>
      <ProfileSetup />
    </>
  );
};

export default ProfileSetupPage;
