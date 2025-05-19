import React from "react";
import { RepositoryCard } from "./RepositoryCard";
import { useQuery } from "@tanstack/react-query";
import { RepositoryResponse } from "@/schema/repository.schema";
import { fetchRepositories } from "@/query/queries";

type RepositoryTableProps = {
  query: string;
};

const parseRepositories = (repositories: RepositoryResponse[]) => {
  const parsedRepositories: RepositoryResponse[][] = [];
  for (let i = 0; i < repositories.length; i += 3) {
    parsedRepositories.push(repositories.slice(i, i + 3));
  }
  return parsedRepositories;
};

export const RepositoryTable = ({ query }: RepositoryTableProps) => {
  const { data, isSuccess } = useQuery<RepositoryResponse[]>({
    queryKey: ["repositories", query],
    queryFn: () => fetchRepositories(query),
  });

  if (!isSuccess) {
    return;
  }

    return (
      <div className="flex flex-col gap-4 ml-22 mr-5 mb-15 md:grid md:grid-cols-[repeat(auto-fit,minmax(22vw,1fr))] md:gap-10 md:mr-20 ">
        {data!.map((repository) => {
          return <RepositoryCard key={repository.id} data={repository} />;
        })}
      </div>
    );
};
