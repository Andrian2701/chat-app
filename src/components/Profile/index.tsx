"use client";
import { useEffect, useState, useMemo } from "react";
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
import { useGetUsers } from "@/hooks/useGetUsers";
import { auth, db } from "@/utils/firebase";
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
  const [currentUserUid, setCurrentUserUid] = useState<string>("");
  const { users } = useGetUsers();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUid(user.uid);
      }
    });
  }, []);

  const currentUser = useMemo(
    () => users?.filter((user) => user.uid === currentUserUid),
    [users, currentUserUid]
  );
  const [user]: any = Array.isArray(currentUser) ? currentUser : [currentUser];

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

  return (
    <>
      {profileModal && (
        <>
          <ModalBack />
          <div className="profile-modal">
            <ModalTop pathname={pathname} label="Profile" />
            <ProfileBar className="profile-menu-modal">
              <SetAvatar currentUserUid={user?.uid} />
            </ProfileBar>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={(values, { setSubmitting }) => {
                const userRef = doc(db, "users", user?.uid);

                updateDoc(userRef, {
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
