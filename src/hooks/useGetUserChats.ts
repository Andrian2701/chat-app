import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../utils/firebase";
import { AuthContext } from "@/context/AuthContext";

export const useGetUserChats = () => {
  const { currentUser } = useContext(AuthContext);
  const [userChats, setUserChats] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (currentUser !== null && currentUser !== undefined) {
      const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) {
          setUserChats(doc.data().chats);
          setLoading(false);
        }
      });

      return () => unSub();
    }
  }, [currentUser?.uid]);

  return { userChats, loading };
};
