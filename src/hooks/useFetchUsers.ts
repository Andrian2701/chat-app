import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../utils/firebase";

export const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsers();
      setUsers(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return { users, loading };
};
