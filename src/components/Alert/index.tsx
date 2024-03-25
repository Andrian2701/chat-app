"use client";
import { useState, useEffect, useContext } from "react";
import { Snackbar, SnackbarOrigin } from "@mui/material";

import { AlertContext } from "@/context/AlertContext";

interface State extends SnackbarOrigin {
  open: boolean;
}

export const Alert = () => {
  const [state, setState] = useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const { alert } = useContext(AlertContext);

  useEffect(() => {
    alert !== null && typeof alert === "string" ? handleOpen() : handleClose();
  }, [alert]);

  const handleOpen = () => setState({ ...state, open: true });
  const handleClose = () => setState({ ...state, open: false });

  return (
    <Snackbar
      ContentProps={{
        sx: {
          backgroundColor: "rgb(29, 155, 240)",
          color: "#fff",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
        },
      }}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      message={alert}
    />
  );
};
