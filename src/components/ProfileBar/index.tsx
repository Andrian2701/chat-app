import { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";
import { Avatar, Skeleton } from "@mui/material";

import { Users } from "@/types";
import "@/styles/components/index.scss";

type Props = {
  data: Users[] | null | undefined;
  loading?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
  pathname?: string;
  className: string;
};

export const ProfileBar = ({
  data,
  loading,
  children,
  onClick,
  pathname = "",
  className,
}: Props) => {
  return (
    <div className={className}>
      {loading ? (
        <>
          <Skeleton
            variant="circular"
            animation="wave"
            sx={{ width: "3.8rem", height: "3.8rem" }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            sx={{ width: 68, height: 19 }}
          />
        </>
      ) : (
        <>
          {data?.map((user) => (
            <>
              <Link href={pathname} key={user.name} onClick={onClick}>
                <Avatar src={user.avatar} alt="avatar" className="avatar">
                  {user.name.charAt(0)}
                </Avatar>
              </Link>
              {children}
              <p>{user.name}</p>
            </>
          ))}
        </>
      )}
    </div>
  );
};
