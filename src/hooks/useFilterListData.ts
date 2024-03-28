import { useState, useEffect } from "react";

import { Users } from "@/types";

type Props = {
  filter: any;
  initialData: Users[] | null | undefined;
};

export const useFilterListData = (initialData: Props) => {
  const [filteredList, setFilteredList] = useState(initialData);

  useEffect(() => {
    if (initialData !== null && initialData !== undefined) {
      Object.keys(initialData).length > 0 && setFilteredList(initialData);
    }
  }, [initialData]);

  const handleFilterList = (searchTerm: string) => {
    const filteredItems = initialData?.filter((item: { name: string }) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filteredItems);
  };

  return { filteredList, handleFilterList };
};
