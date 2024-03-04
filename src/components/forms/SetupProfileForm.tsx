"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import { doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import FormButton from "../common/FormButton";
import { StyledTextField } from "./SignUpForm";
import { db, auth } from "@/api/firebase-config";
import "@/styles/components/index.scss";

type FormVals = {
  name: string;
  bio: string;
};

const SetupProfileForm = () => {
  const router = useRouter();
  const [currentUserUid, setCurrentUserUid] = useState("");
  const initialValues: FormVals = {
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUid(user.uid);
      }
    });
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const currentUserRef = doc(db, "users", currentUserUid);
        updateDoc(currentUserRef, {
          name: values.name,
          bio: values.bio,
        });
        setSubmitting(false);
        router.push("/");
      }}
    >
      {({ values, handleSubmit, handleChange }) => {
        return (
          <Form id="form" onSubmit={handleSubmit}>
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
              <FormButton label="Start" />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SetupProfileForm;
