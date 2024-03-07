import Link from "next/link";
import { RiArrowLeftLine } from "react-icons/ri";

import "@/styles/components/index.scss";

type ModalTopProps = {
  pathname: any;
  label: string;
};

export const ModalTop = ({ pathname, label }: ModalTopProps) => {
  return (
    <div className="modal-top">
      <Link href={pathname}>
        <RiArrowLeftLine />
      </Link>
      <h1>{label}</h1>
    </div>
  );
};
