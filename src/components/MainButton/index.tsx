import { Button } from "@mui/material";

import "@/styles/components/index.scss";

type Props = {
  className?: string;
  label: string;
  onClick?: () => void;
};

export const MainButton = ({ className, label, onClick }: Props) => (
  <Button
    type="submit"
    className={className ? className : "main-btn"}
    onClick={onClick}
    disableRipple
  >
    {label}
  </Button>
);
