"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { Backdrop } from "@mui/material";

import { AppButton } from "../AppButton";
import { auth } from "@/api/firebase-config";
import "@/styles/components/index.scss";

export const UserProfileModal = () => {
  const [open] = useState(true);
  const searchParams = useSearchParams();
  const userProfile = searchParams.get("userProfile");
  const pathname = usePathname();
  const router = useRouter();

  return <h1>hello</h1>;
};
