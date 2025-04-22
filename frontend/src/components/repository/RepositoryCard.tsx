import React from "react";
import { RepositoryCardHeader } from "./RepositoryCardHeader";
import { RepositoryCardFooter } from "./RepositoryCardFooter";
import Link from "next/link";
import { RepositoryResponse } from "@/schema/repository.schema";

type RepositoryCardProps = { data: RepositoryResponse };

export const RepositoryCard = ({ data }: RepositoryCardProps) => {
  return (
    <Link
      href={`repositories/${data.full_name}/${data.id}`}
      className="flex flex-col p-3 justify-between bg-indigo-900 text-white rounded-3xl h-60 md:min-h-96 md:hover:shadow-[8px_8px_10px_-5px_rgba(94,233,182,0.8)]"
    >
      <div className="flex flex-col justify-start shrink">
        <RepositoryCardHeader full_name={data.full_name} login={data.owner.login} />
        <div className="mt-2 mb-3  pr-2 pl-2 shrink">
          <div className="text-sm md:text-[22px] font-extralight overflow-y-scroll self-center h-24">
            {data.description}
          </div>
        </div>
      </div>

      <div className="flex overflow-x-scroll">
        <RepositoryCardFooter
          language={data.language || ""}
          contribution={data._count.contributions}
          stargazers_count={data.stargazers_count || 0}
        />
      </div>
    </Link>
  );
};
