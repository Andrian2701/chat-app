import Link from "next/link";
import { AiOutlineNotification } from "react-icons/ai";
import { PiMoonLight } from "react-icons/pi";
import {
  IoBookmarkOutline,
  IoPeopleOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { TbUserCircle } from "react-icons/tb";

import "@/styles/components/index.scss";

type Props = {
  onClick?: any;
};

export const NavBar = ({ onClick }: Props) => {
  return (
    <ul className="nav-bar">
      <Link href="#">
        <IoPeopleOutline />
        <p>New Group</p>
      </Link>
      <Link href="#">
        <AiOutlineNotification />
        <p>New Channel</p>
      </Link>
      <Link href="?addChats=true" onClick={onClick}>
        <TbUserCircle />
        <p>People</p>
      </Link>
      <Link href="#">
        <IoBookmarkOutline />
        <p>Saved Messages</p>
      </Link>
      <Link href="#">
        <IoSettingsOutline />
        <p>Settings</p>
      </Link>
      <Link href="#">
        <IoMoonOutline />
        <p>Night Mode</p>
      </Link>
    </ul>
  );
};
