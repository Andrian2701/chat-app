"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendSignInLinkToEmail, onAuthStateChanged } from "firebase/auth";
import { Divider } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { AppButton, GoogleButton } from "@/components/index";
import { SnackBar } from "@/components/index";
import { StyledTextField } from "../SignUp";
import { FormValues } from "@/types/FormValues";
import { auth, actionCodeSettings } from "@/utils/firebase";
import "@/styles/layout/index.scss";

export const SignIn = () => {
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
            setSubmitting(false);
          })
          .catch(() =>
            setAlertLabel(
              "Something went wrong while sending the sign-in link. Please try again later"
            )
          );
      }}
    >
      {({ values, handleSubmit, handleChange }) => {
        return (
          <>
            <Form onSubmit={handleSubmit}>
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
                <AppButton className="app-btn-black" label="Send link" />
                <div className="to-sign-in">
                  Don't have an account?
                  <Link href="/sign-up">Sign up</Link>
                </div>
              </div>
            </Form>
            <SnackBar alertLabel={alertLabel} />
          </>
        );
      }}
    </Formik>
  );
};
