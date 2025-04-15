import React from "react";
import RepositoryCard from "./RepositoryCard";
import { useQuery } from "@tanstack/react-query";
import { RepositoryResponse } from "@/schema/repository.schema";
import { fetchRepositories } from "@/query/queries";

const parseRepositories = (repositories: RepositoryResponse[]) => {
  const parsedRepositories: RepositoryResponse[][] = [];
  for (let i = 0; i < repositories.length; i += 3) {
    parsedRepositories.push(repositories.slice(i, i + 3));
  }
  return parsedRepositories;
};

function RepositoryTable({ query }: { query: string }) {
  const { data, isSuccess } = useQuery<RepositoryResponse[]>({
    queryKey: ["repositories", query],
    queryFn: () => fetchRepositories(query),
  });

  if (isSuccess) {
    if (process.env.NEXT_PUBLIC_USE_GRID === "true") {
      return (
        <div className="flex flex-col gap-4 ml-22 mr-5 mb-15 md:grid md:grid-cols-[repeat(auto-fit,minmax(22vw,1fr))] md:gap-10 md:mr-20 ">
          {data!.map((repository) => {
            return <RepositoryCard key={repository.id} data={repository} />;
          })}
        </div>
      );
    } else {
      return (
        <div className="flex flex-col md:mr-15">
          {parseRepositories(data).map((repositoryChunk) => {
            return (
              <div
                key={data!.map((r) => r.id).join("")}
                className="flex flex-col self-center ml-22 mr-5 md:ml-20 md:flex-row md:justify-between "
              >
                {repositoryChunk.map((repository) => {
                  return (
                    <div key={repository.id} className="mb-5 md:shrink-0 md:w-15/48 md:min-w-sm md:mr-4">
                      <RepositoryCard data={repository} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      );
    }
  }
}

export default RepositoryTable;
