import { useContext, useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";

import { db } from "../utils/firebase";
import { Users } from "@/types";
import { AuthContext } from "@/context/AuthContext";

export const useGetUsers = () => {
  const { currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState<Users[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const q = query(collection(db, "users"));

    const unsub = onSnapshot(q, (querySnapshot) => {
      const data: any[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() });
      });
      setUsers(data);
      setLoading(false);
    });

    return () => unsub();
  }, [currentUser]);

  return { users, loading };
};
