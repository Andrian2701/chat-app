"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Divider } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { AppButton, GoogleAuth, Alert } from "@/components";
import { AlertContext, SET_ALERT } from "@/context/AlertContext";
import { StyledTextField } from "../SignUp";
import { auth } from "@/utils/firebase";
import "@/styles/components/index.scss";

type FormValues = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const { dispatch }: any = useContext(AlertContext);
  const router = useRouter();

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Required min 8")
      .max(16, "Required max 16"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then(() => {
            dispatch({
              type: SET_ALERT,
              payload: "Successfull Authentification.",
            });
            setTimeout(() => {
              dispatch({ type: "SET_ALERT", payload: null });
              router.push("/");
            }, 2000);
          })
          .catch(() => {
            dispatch({
              type: SET_ALERT,
              payload: "Email or password isn't correct. Please try.",
            });
          });

        setSubmitting(false);
      }}
    >
      {({ values, handleSubmit, handleChange }) => {
        return (
          <>
            <Form className="sign-in" onSubmit={handleSubmit}>
              <h1>Sign in to SyncTalk</h1>
              <GoogleAuth label="Sign in" />
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
                <StyledTextField
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  value={values.password}
                  onChange={handleChange}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <div className="nav">
                <AppButton label="Sign in" />
                <div className="to-sign-in">
                  Don't have an account?
                  <Link href="/sign-up">Sign up</Link>
                </div>
              </div>
            </Form>
            <Alert />
          </>
        );
      }}
    </Formik>
  );
};
