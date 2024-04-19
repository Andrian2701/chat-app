import { useContext } from "react";
import Link from "next/link";
import { Menu, MenuProps } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";

import { AuthContext } from "@/context/AuthContext";
import { MenuItems } from "@/types";
import "@/styles/components/index.scss";

type Props = {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  handleDeleteMessage?: () => Promise<void>;
  menuItems: MenuItems[];
  className?: string | null;
  mUid?: string | null;
};

export const PopupMenu = ({
  anchorEl,
  open,
  handleClose,
  menuItems,
  handleDeleteMessage,
  className = null,
  mUid = null,
}: Props) => {
  const { currentUser } = useContext(AuthContext);

  const getTransformOrigin = () => {
    return className === "sender-m"
      ? { horizontal: "right", vertical: "top" }
      : { horizontal: "left", vertical: "top" };
  };
  const getAnchorOrigin = () => {
    return className === "sender-m"
      ? { horizontal: "left", vertical: "bottom" }
      : { horizontal: "right", vertical: "bottom" };
  };

  return (
    <Menu
      className="menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={getTransformOrigin() as MenuProps["transformOrigin"]}
      anchorOrigin={getAnchorOrigin() as MenuProps["anchorOrigin"]}
    >
      {menuItems.map((item: MenuItems) => (
        <Link
          href={item.href}
          key={item.title}
          style={item.color ? { color: item.color } : undefined}
        >
          {item.icon}
          <p>{item.title}</p>
        </Link>
      ))}
      {mUid !== null && currentUser.uid === mUid && (
        <Link href="#" onClick={handleDeleteMessage}>
          <AiOutlineDelete />
          <p>Delete</p>
        </Link>
      )}
    </Menu>
  );
};
