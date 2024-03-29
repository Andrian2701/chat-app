import { Button } from "@mui/material";

import "@/styles/components/index.scss";

type Props = {
  label: string;
  onClick?: () => void;
};

export const MainButton = ({ label, onClick }: Props) => {
  return (
    <Button type="submit" className="main-btn" onClick={onClick} disableRipple>
      {label}
    </Button>
  );
};
