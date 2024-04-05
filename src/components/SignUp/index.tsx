"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { styled, Divider, TextField } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { GoogleAuth, FormButton } from "@/components/index";
import { auth, db } from "@/utils/firebase";
import { FormVals } from "@/types";
import "@/styles/components/index.scss";

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

  const initialValues: FormVals = {
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        values.email &&
          values.password &&
          createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          ).then((userCredential) => {
            setDoc(doc(db, "users", userCredential.user.uid), {
              uid: userCredential.user.uid,
              name: userCredential.user.displayName,
              email: userCredential.user.email,
            });

            router.push("/profile-setup");
          });

        setSubmitting(false);
      }}
    >
      {({ values, handleSubmit, handleChange }) => {
        return (
          <Form className="sign-up" onSubmit={handleSubmit}>
            <h1>Sign up to Evertalk</h1>
            <GoogleAuth label="Sign up" />
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
              <FormButton label="Next" />
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
