import { SignIn } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in to evertalk",
  description: "Login to Evertalk with our user-friendly sign in",
};

const SignInPage = () => {
  return (
    <>
      <SignIn />
    </>
  );
};

export default SignInPage;
