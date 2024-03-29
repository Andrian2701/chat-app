"use client";
import { useMemo, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import { RiArrowLeftLine } from "react-icons/ri";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  StyledTextField,
  SetAvatar,
  ModalOverlay,
  ProfileBar,
  MainButton,
} from "@/components";
import { AuthContext } from "@/context/AuthContext";
import { UsersContext } from "@/context/UsersContext";
import { db } from "@/utils/firebase";
import "@/styles/components/index.scss";

type FormValues = {
  name: string;
  bio: string;
};

export const CurrentProfile = () => {
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

  return (
    <>
      {profileModal && (
        <>
          <ModalOverlay />
          <div className="auth-profile">
            <div className="flex-top">
              <Link href={pathname}>
                <RiArrowLeftLine />
              </Link>
              <h1>Profile</h1>
            </div>
            <ProfileBar className="auth-profile-menu">
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
                updateProfile(currentUser, {
                  displayName: values.name,
                });

                setSubmitting(false);
                router.push(pathname);
              }}
            >
              {({ values, handleSubmit, handleChange }) => (
                <Form className="edit-profile-form" onSubmit={handleSubmit}>
                  <StyledTextField
                    variant="standard"
                    name="bio"
                    label="Bio"
                    multiline
                    value={values.bio}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    sx={{
                      "& .MuiInput-root": {
                        "&:after": {
                          borderColor: "rgb(29, 155, 240)",
                        },
                      },
                    }}
                  />
                  <ErrorMessage name="bio" className="error" component="div" />
                  <div className="text">
                    Any details such as age, job. <br></br>Example: 25 y.o.
                    florist from Norway
                  </div>
                  <StyledTextField
                    variant="standard"
                    name="name"
                    label="Name"
                    value={values.name}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      e.key === "Enter" && e.preventDefault();
                    }}
                    sx={{
                      "& .MuiInput-root": {
                        "&:after": {
                          borderColor: "rgb(29, 155, 240)",
                        },
                      },
                    }}
                  />
                  <ErrorMessage name="name" className="error" component="div" />
                  <div className="text">
                    Name lets people find or contact you on Evertalk easier.
                  </div>
                  <div className="btns">
                    <Link href={pathname}>
                      <MainButton label="Close" />
                    </Link>
                    <MainButton label="Save" />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </>
  );
};
