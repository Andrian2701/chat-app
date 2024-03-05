import { Hamburger } from "../Hamburger";
import { SearchChats } from "../SearchChats";
import "@/styles/components/index.scss";

export const SideBarTop = () => {
  return (
    <div className="side-bar-top">
      <Hamburger />
      <SearchChats />
    </div>
  );
};
