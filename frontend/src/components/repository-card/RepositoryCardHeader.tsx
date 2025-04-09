import React from "react";

function RepositoryCardHeader({ full_name, login }: { full_name: string; login: string }) {
  return (
    <div className="flex flex-row justify-start h-14">
      <svg fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="white" className="size-15 mr-1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 6.375c0 2.28-3.69 4.13-8.25 4.13S3.75 8.65 3.75 6.38c0-2.28 3.69-4.13 8.25-4.13s8.25 1.85 8.25 4.13v11.25c0 2.28-3.69 4.13-8.25 4.13s-8.25-1.85-8.25-4.13V6.38m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75c0 2.28-3.69 4.13-8.25 4.13s-8.25-1.85-8.25-4.13v-3.75c0 2.28 3.69 4.13 8.25 4.13s8.25-1.85 8.25-4.13"
        />
      </svg>
      <div className="flex flex-col justify-start w-72">
        <div className="text-3xl font-medium">{full_name}</div>
        <div className="text-1xl font-extralight">@{login}</div>
      </div>
    </div>
  );
}

export default RepositoryCardHeader;
