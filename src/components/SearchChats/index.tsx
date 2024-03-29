"use client";

import { useState } from "react";

import "@/styles/components/index.scss";

type SearchChatsProps = {
  onChangeCallback: (searchTerm: string) => void;
};

export const SearchChats = ({ onChangeCallback }: SearchChatsProps) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    onChangeCallback && onChangeCallback(inputValue);
  };

  return (
    <input
      type="text"
      placeholder="Search"
      className="search-chats-input"
      value={value}
      onChange={handleChange}
    />
  );
};
