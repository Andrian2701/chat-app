import { TbUserCircle } from "react-icons/tb";
import { LiaBroomSolid } from "react-icons/lia";
import { AiOutlineDelete } from "react-icons/ai";
import { BiBrush } from "react-icons/bi";
import {
  IoArrowUndoOutline,
  IoCheckmarkCircleOutline,
  IoCopyOutline,
} from "react-icons/io5";

import { MenuItems } from "@/types";

export const chatMenuItems: MenuItems[] = [
  {
    href: "?userInfo=true",
    icon: <TbUserCircle />,
    title: "View profile",
  },
  {
    href: "#",
    icon: <BiBrush />,
    title: "Set theme",
  },
  {
    href: "?clearChat=true",
    icon: <LiaBroomSolid />,
    title: "Clear chat",
  },
  {
    href: "?deleteChat=true",
    icon: <AiOutlineDelete />,
    title: "Delete chat",
    color: "#d0312d",
  },
];

export const messageMenuItems: MenuItems[] = [
  {
    href: "#",
    icon: <IoArrowUndoOutline />,
    title: "Reply",
  },
  {
    href: "#",
    icon: <IoCopyOutline />,
    title: "Copy",
  },
  {
    href: "#",
    icon: <IoCheckmarkCircleOutline />,
    title: "Select",
  },
];
