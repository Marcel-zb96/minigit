import React, { ChangeEvent } from "react";
import { useTranslations } from "use-intl";

type SearchInputProps = {
  handleSearch: (input: string) => void;
};

export const SearchInput = ({ handleSearch }: SearchInputProps) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  const t = useTranslations("RepositoriesPage");

  return (
    <div className="relative mt-5 md:mt-10 self-center ml-15 md:mr-30">
      <svg fill="none" viewBox="0 0 24 24" className="size-7 md:size-9 mt-1.5 md:mt-2.5 absolute right-3 md:right-5">
        <path stroke="black" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
      </svg>
      <input
        type="text"
        placeholder={t("search")}
        className="bg-white md:text-3xl rounded-2xl md:rounded-4xl h-10 md:h-15 md:w-80 pl-4 "
        onChange={(e) => handleSearchChange(e)}
      />
    </div>
  );
};
