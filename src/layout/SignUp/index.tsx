"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { styled, Divider, TextField } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { AppButton, GoogleButton } from "@/components/index";
import { FormValues } from "@/types/FormValues";
import { auth, db } from "@/utils/firebase";
import "@/styles/layout/index.scss";

export const StyledTextField = styled(TextField)`
  & label.Mui-focused {
    color: rgb(29, 155, 240);
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: rgb(29, 155, 240);
    }
    fieldset {
      border-color: #b5b5b5;
    }
  }
`;

export const SignUp = () => {
  const router = useRouter();
  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Required min 8")
      .max(16, "Required max 16")
      .required("Password is required"),
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
        router.push("/setup-profile");
      }
    });
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        createUserWithEmailAndPassword(auth, values.email, values.password);
        setSubmitting(false);
      }}
    >
      {({ values, handleSubmit, handleChange }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <h1>Sign up to SyncTalk</h1>
            <GoogleButton label="Sign up" />
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
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="nav">
              <AppButton className="app-btn-black" label="Sign up" />
              <div className="to-sign-in">
                Have an account?
                <Link href="/sign-in">Sign in</Link>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
