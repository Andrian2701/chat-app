import { ChatList, Hamburger, SearchInput } from "@/components";
import { useGetUserChats } from "@/hooks/useGetUserChats";
import { useFilterList } from "@/hooks/useFilterList";
import "@/styles/layout/index.scss";

export const SideBar = () => {
  const { userChats, loading } = useGetUserChats();
  const { filteredList, handleFilterList } = useFilterList(userChats);

  return (
    <div className="side-bar">
      <div className="top">
        <Hamburger />
        <SearchInput
          className="search-chats"
          onChangeCallback={handleFilterList}
        />
      </div>
      <div className="bottom">
        <ChatList chats={filteredList} loading={loading} />
      </div>
    </div>
  );
};
