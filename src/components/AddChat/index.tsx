"use client";
import Link from "next/link";
import { useContext, useEffect, useMemo } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { RiArrowLeftLine } from "react-icons/ri";
import { LiaSearchSolid } from "react-icons/lia";

import { MainButton, ModalOverlay, Search, UserList } from "@/components";
import { AuthContext } from "@/context/AuthContext";
import { UsersContext } from "@/context/UsersContext";
import { useFilterListData } from "@/hooks/useFilterListData";
import "@/styles/components/index.scss";

export const AddChat = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const addChats = searchParams.get("addChat");
  const { currentUser } = useContext(AuthContext);
  const { users, loading } = useContext(UsersContext);

  const unAuthenticatedUsers: any = useMemo(() => {
    return currentUser
      ? users?.filter((user) => user.uid !== currentUser.uid)
      : null;
  }, [users, currentUser]);

  const { filteredList, handleFilterList } =
    useFilterListData(unAuthenticatedUsers);

  useEffect(() => {
    handleFilterList("");
  }, [addChats]);

  return (
    <>
      {addChats && (
        <>
          <ModalOverlay />
          <div className="add-users">
            <div className="flex-top">
              <Link href={pathname}>
                <RiArrowLeftLine />
              </Link>
              <h1>People</h1>
            </div>
            <div className="flex-bottom">
              <div className="side-bar-top">
                <Search
                  className="search-users"
                  onChangeCallback={handleFilterList}
                >
                  <LiaSearchSolid className="search-icon" />
                </Search>
              </div>
              <UserList users={filteredList} loading={loading} />
              <div className="btns">
                <MainButton label="Add chat" />
                <Link href={pathname}>
                  <MainButton label="Close" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
