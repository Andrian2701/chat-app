import { SignUp } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up to evertalk",
  description: "Sign up to Evertalk with our user-friendly sign up",
};

const SignUpPage = () => {
  return (
    <>
      <SignUp />
    </>
  );
};

export default SignUpPage;
