import { RepositoryCardType } from "@/app/repositories/page";
import React from "react";
import RepositoryCardHeader from "./RepositoryCardHeader";
import RepositoryCardFooter from "./RepositoryCardFooter";

function RepositoryCard({ data }: { data: RepositoryCardType }) {
  return (
    <div className="flex flex-col p-3 justify-between bg-indigo-900 text-white rounded-3xl h-64 w-full">
      <RepositoryCardHeader full_name={data.full_name} login={data.owner.login} />

      <div className="flex flex-col justify-start">
        <div className="text-sm font-extralight pr-2 pl-2 h-28 overflow-y-scroll self-center">{data.description}</div>
      </div>
      
      <RepositoryCardFooter language={data.language} contribution={data._count.contribution} stargazers_count={data.stargazers_count} />
    </div>
  );
}

export default RepositoryCard;
