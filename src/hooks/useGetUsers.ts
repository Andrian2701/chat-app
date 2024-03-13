import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

import { db, storage } from "../utils/firebase";

type Users = {
  bio: string;
  email: string;
  name: string;
  uid: string;
  avatar: string;
};

export const useGetUsers = () => {
  const [users, setUsers] = useState<Users[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribeFirestore = onSnapshot(
      collection(db, "users"),
      async (snapshot) => {
        const fetchedUsers: Users[] = [];
        const promises: Promise<void>[] = [];

        snapshot.forEach((doc) => {
          const userData = doc.data() as Users;
          const avatarRef = ref(storage, `users-avatars/${userData.uid}`);
          const promise = getDownloadURL(avatarRef)
            .then((avatarUrl) => {
              fetchedUsers.push({ ...userData, avatar: avatarUrl });
            })
            .catch(() => {
              fetchedUsers.push({ ...userData, avatar: "" });
            });
          promises.push(promise);
        });

        await Promise.all(promises);

        setLoading(false);
        setUsers(fetchedUsers);
      }
    );

    return () => unsubscribeFirestore();
  }, []);

  return { users, loading };
};
