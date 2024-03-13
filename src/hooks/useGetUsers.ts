import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { StorageReference, getDownloadURL, ref } from "firebase/storage";

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

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const userData: Users[] = [];

    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const avatarPath: StorageReference = ref(
          storage,
          `users-avatars/${doc.data().uid}`
        );
        try {
          const avatarUrl = await getDownloadURL(avatarPath);
          userData.push({
            ...doc.data(),
            avatar: avatarUrl,
          });
        } catch (error) {
          userData.push({
            ...doc.data(),
            avatar: "",
          });
        }
      })
    );

    return userData;
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchUsers();
      setUsers(data);
      setLoading(false);
    };
    getData();
  }, []);

  return { users, loading };
};
