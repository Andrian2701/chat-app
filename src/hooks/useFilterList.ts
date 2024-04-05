import { useState, useEffect } from "react";

import { Users } from "@/types";

type Props = {
  filter: any;
  data: Users[] | null | undefined;
};

export const useFilterList = (data: Props) => {
  const [filteredList, setFilteredList] = useState(data);

  useEffect(() => {
    if (data !== null && data !== undefined) {
      Object.keys(data).length > 0 && setFilteredList(data);
    }
  }, [data]);

  const handleFilterList = (searchTerm: string) => {
    const filteredItems = data?.filter((item: { name: string }) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredList(filteredItems);
  };

  return { filteredList, handleFilterList };
};
