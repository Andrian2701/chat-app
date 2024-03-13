import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "../utils/firebase";

type CurrentUser = {
  bio: string;
  email: string;
  name: string;
  uid: string;
};

export const useGetCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        setCurrentUser(snapshot.data() as CurrentUser);
        setLoading(false);
      }
    });
  }, []);

  return { currentUser, loading };
};
