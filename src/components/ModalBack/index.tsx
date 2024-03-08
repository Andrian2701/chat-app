"use client";
import { useState } from "react";
import { Backdrop } from "@mui/material";

export const ModalBack = () => {
  const [open] = useState<boolean>(true);

  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      }}
    />
  );
};
