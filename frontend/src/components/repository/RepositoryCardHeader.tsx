import { RepositoryIcon } from "@/assets/RepositoryIcon";
import React from "react";

type RepositoryCardHeaderProps = {
  full_name: string;
  login: string;
};

export const RepositoryCardHeader = ({ full_name, login }: RepositoryCardHeaderProps) => {
  return (
    <div className="flex flex-row justify-start md:mb-3">
      <RepositoryIcon classes={"md:size-26"} />
      <div className="flex flex-col justify-start w-full ml-1.5 md:mt-3">
        <div className="text-3xl font-medium md:text-[35px] max-h-30 overflow-scroll">{full_name}</div>
        <div className="text-1xl font-extralight md:text-[25px]">@{login}</div>
      </div>
    </div>
  );
};
