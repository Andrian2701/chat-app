"use client";
import { useContext } from "react";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  updateDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { Form, Formik } from "formik";
import { RiArrowLeftLine } from "react-icons/ri";

import { MainButton, ModalOverlay, StyledTextField } from "@/components";
import { ChatContext } from "@/context/ChatContext";
import { db } from "@/utils/firebase";
import { Users } from "@/types";
import "@/styles/components/index.scss";

export const EditChat = () => {
  const { chat } = useContext(ChatContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const editChat = searchParams.get("editChat");

  const initialValues: { name: string } = {
    name: chat?.user.name || "",
  };

  return (
    <>
      {editChat && (
        <>
          <ModalOverlay />
          <div className="edit-chat">
            <div className="flex-top">
              <Link href={pathname}>
                <RiArrowLeftLine />
              </Link>
              <h1>Edit chat</h1>
            </div>
            <div className="flex-bottom">
              <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                onSubmit={async (values, { setSubmitting }) => {
                  const q = query(
                    collection(db, "userChats"),
                    where("chats", "array-contains", {
                      uid: chat.user.uid,
                      name: chat.user.name,
                      email: chat.user.email,
                      avatar: chat.user.avatar,
                    })
                  );
                  const querySnapshot = await getDocs(q);
                  const doc = querySnapshot.docs[0];
                  const chats = doc.data().chats;

                  const updatedChats = chats.map((chatItem: Users) => {
                    if (chatItem.uid === chat.user.uid) {
                      return {
                        ...chatItem,
                        name: values.name,
                      };
                    } else {
                      return chatItem;
                    }
                  });
                  await updateDoc(doc.ref, { chats: updatedChats });

                  setSubmitting(false);
                  router.push(pathname);
                }}
              >
                {({ values, handleSubmit, handleChange }) => (
                  <Form onSubmit={handleSubmit}>
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
                    <div className="btns">
                      <Link href={pathname}>
                        <MainButton label="Cancel" />
                      </Link>
                      <MainButton label="Save" />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>
      )}
    </>
  );
};
