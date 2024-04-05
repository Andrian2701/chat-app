"use client";
import { useState } from "react";

import "@/styles/components/index.scss";

type Props = {
  className: string;
  children?: React.ReactNode;
  onChangeCallback: (searchTerm: string) => void;
};

export const SearchInput = ({
  className,
  onChangeCallback,
  children,
}: Props) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    onChangeCallback && onChangeCallback(inputValue);
  };

  return (
    <>
      {children}
      <input
        type="text"
        placeholder="Search"
        className={className}
        value={value}
        onChange={handleChange}
      />
    </>
  );
};
