"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { sendSignInLinkToEmail, onAuthStateChanged } from "firebase/auth";
import { Divider } from "@mui/material";

import GoogleButton from "../common/GoogleButton";
import FormButton from "../common/FormButton";
import Alert from "../common/Alert";
import { StyledTextField } from "./SignUpForm";
import { FormValues } from "@/types/FormValues";
import { auth, actionCodeSettings } from "@/api/firebase-config";
import "@/styles/components/index.scss";

const SignInForm = () => {
  const [alertLabel, setAlertLabel] = useState<string | null>(null);
  const initialValues: FormValues = {
    email: "",
  };
  const router = useRouter();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAlertLabel("Redirect...");
        setTimeout(() => router.push("/"), 2000);
      }
    });
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        sendSignInLinkToEmail(auth, values.email, actionCodeSettings)
          .then(() => {
            window.localStorage.setItem("emailForSignIn", values.email);
            setAlertLabel("A sign-in link has been sent to your email");
          })
          .catch(() =>
            setAlertLabel(
              "Something went wrong while sending the sign-in link. Please try again later"
            )
          );
        setSubmitting(false);
      }}
    >
      {({ values, handleSubmit, handleChange }) => {
        return (
          <>
            <Form id="form" onSubmit={handleSubmit}>
              <h1>Sign in to SyncTalk</h1>
              <GoogleButton label="Sign in" />
              <Divider className="divider">or</Divider>
              <div className="input-container">
                <StyledTextField
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="nav">
                <FormButton label="Send link" />
                <div className="to-sign-in">
                  Don't have an account?
                  <Link href="/sign-up">Sign up</Link>
                </div>
              </div>
            </Form>
            <Alert alertLabel={alertLabel} />
          </>
        );
      }}
    </Formik>
  );
};

export default SignInForm;
