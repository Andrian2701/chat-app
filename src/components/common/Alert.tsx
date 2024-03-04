import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Snackbar, SnackbarOrigin } from "@mui/material";

interface State extends SnackbarOrigin {
  open: boolean;
}

type AlertProps = {
  alertLabel: null | string;
};

const Alert = ({ alertLabel }: AlertProps) => {
  const [state, setState] = useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  useEffect(() => {
    alertLabel !== null && typeof alertLabel === "string" && handleOpen();
  }, [alertLabel]);

  const handleOpen = () => setState({ ...state, open: true });

  return (
    <Snackbar
      ContentProps={{
        sx: {
          backgroundColor: "rgb(29, 155, 240)",
          color: "#ffffff",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
        },
      }}
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      message={alertLabel}
    />
  );
};

export default Alert;
