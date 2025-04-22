"use client";

import { RepositoryTable } from "@/components/repository/RepositoryTable";
import { SearchInput } from "@/components/search/SearchInput";
import React, { useState } from "react";

const Repository = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="flex flex-col md:ml-96 w-full h-full">
      <div className="flex flex-col mb-10 md:flex-row md:justify-between md:self-start md:mb-15 w-full">
        <div className="font-extrabold self-center ml-15 mt-5 md:mt-8 text-white text-[40px] md:font-stretch-150%">
          Repositories
        </div>
        <SearchInput handleSearch={setSearch} />
      </div>
      <RepositoryTable query={search} />
    </div>
  );
}

export default Repository;