"use client";
import { useEffect, useState, useMemo, useContext } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile, onAuthStateChanged } from "firebase/auth";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { ModalTop } from "../ModalTop";
import { AppButton, SetAvatar, ModalBack } from "..";
import { ProfileBar } from "../ProfileBar";
import { StyledTextField } from "@/components";
import { auth, db } from "@/utils/firebase";
import { AuthContext } from "@/context/AuthContext";
import { UsersContext } from "@/context/UsersContext";
import "@/styles/components/index.scss";

type FormValues = {
  name: string;
  bio: string;
};

export const Profile = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const profileModal = searchParams.get("profileModal");
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const { users } = useContext(UsersContext);

  const currentUserData = useMemo(() => {
    return currentUser
      ? users?.filter((user) => user.uid === currentUser.uid)
      : null;
  }, [users, currentUser]);

  const [user]: any = Array.isArray(currentUserData)
    ? currentUserData
    : [currentUserData];

  const initialValues: FormValues = {
    name: user?.name || "",
    bio: user?.bio || "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Required min 2")
      .max(16, "Required max 16")
      .required("Name is required"),
    bio: Yup.string().min(4, "Required min 4").max(100, "Required max 100"),
  });

  console.log("current", currentUser);
  console.log("users", users);
  console.log("test", user);

  return (
    <>
      {profileModal && (
        <>
          <ModalBack />
          <div className="profile-modal">
            <ModalTop pathname={pathname} label="Profile" />
            <ProfileBar className="profile-menu-modal">
              <SetAvatar />
            </ProfileBar>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={(values, { setSubmitting }) => {
                updateDoc(doc(db, "users", currentUser.uid), {
                  name: values.name,
                  bio: values.bio,
                });
                updateProfile(auth.currentUser, {
                  displayName: values.name,
                });
                setSubmitting(false);
                router.push(pathname);
              }}
            >
              {({ values, handleSubmit, handleChange }) => (
                <Form className="edit-profile-form" onSubmit={handleSubmit}>
                  <StyledTextField
                    variant="outlined"
                    name="name"
                    label="Name"
                    value={values.name}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                  />
                  <ErrorMessage name="name" className="error" component="div" />
                  <StyledTextField
                    variant="outlined"
                    name="bio"
                    label="Bio"
                    value={values.bio}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    rows={5}
                    multiline
                  />
                  <ErrorMessage name="bio" className="error" component="div" />
                  <AppButton label="Save" />
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </>
  );
};
