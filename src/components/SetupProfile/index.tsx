"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { SnackBar, AppButton } from "@/components/index";
import { StyledTextField } from "../SignUp";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { auth, db } from "@/utils/firebase";
import "@/styles/components/index.scss";

type FormValues = {
  name: string;
  bio: string;
};

export const SetupProfile = () => {
  const router = useRouter();
  const [alertLabel, setAlertLabel] = useState<null | string>(null);
  const { currentUser } = useGetCurrentUser();

  const initialValues: FormValues = {
    name: "",
    bio: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Required min 2")
      .max(16, "Required max 16")
      .required("Name is required"),
    bio: Yup.string().min(4, "Required min 4").max(100, "Required max 100"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const currentUserRef = doc(db, "users", currentUser?.uid);
        updateDoc(currentUserRef, {
          name: values.name,
          bio: values.bio,
        });
        updateProfile(auth.currentUser, {
          displayName: values.name,
        });
        setAlertLabel("Redirect...");
        setTimeout(() => router.push("/"), 2000);
        setSubmitting(false);
      }}
    >
      {({ values, handleSubmit, handleChange }) => {
        return (
          <>
            <Form className="setup-profile" onSubmit={handleSubmit}>
              <h1>Almost there!</h1>
              <div className="input-container">
                <StyledTextField
                  type="name"
                  name="name"
                  label="Name"
                  variant="outlined"
                  value={values.name}
                  onChange={handleChange}
                />
                <ErrorMessage name="name" component="div" className="error" />
                <StyledTextField
                  type="text"
                  name="bio"
                  label="Bio"
                  variant="outlined"
                  multiline
                  rows={5}
                  value={values.bio}
                  onChange={handleChange}
                />
                <ErrorMessage name="bio" component="div" className="error" />
              </div>
              <div className="nav">
                <AppButton label="Start" />
              </div>
            </Form>
            <SnackBar alertLabel={alertLabel} />
          </>
        );
      }}
    </Formik>
  );
};
