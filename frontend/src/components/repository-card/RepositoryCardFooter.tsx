import React from "react";

function RepositoryCardFooter({
  language,
  contribution,
  stargazers_count,
}: {
  language: string;
  contribution: number;
  stargazers_count: number;
}) {
  return (
    <div className="flex flex-col justify-end pl-2">

      <div className="flex flex-row w-full">
        <svg fill="currentColor" strokeWidth={0.5} className="mr-2 mt-0.5 size-4" viewBox="0 0 16 12">
          <path d="M14 5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
          <path d="M13 10.25h1v1h-1zM13 8.25h1v1h-1zM8 8.25h1v1H8zM10 8.25h2v1h-2zM11 10.25h1v1h-1zM6 8.25h1v1H6zM4 8.25h1v1H4zM2 8.25h1v1H2zM13 6.25h1v1h-1zM11 6.25h1v1h-1zM9 6.25h1v1H9zM7 6.25h1v1H7zM5 6.25h1v1H5zM2 6.25h2v1H2zM2 10.25h1v1H2zM4 10.25h6v1H4z" />
        </svg>
        <div className="text-md font-medium">{language}</div>
      </div>

      <div className="flex flex-row justify-between w-full">
        
        <div className="flex lex-row">
          <svg viewBox="0 0 25 20" fill="currentColor" className="size-4 mr-2 mt-0.5 text-emerald-300">
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clipRule="evenodd"
            />
          </svg>
          <div>{stargazers_count}</div>
        </div>

        <div className="flex flex-row pr-2">
          <div className="text-sm font-extralight mr-2">Contributions: </div>
          <div className="text-sm font-bold text-emerald-300">{contribution}</div>
        </div>
      
      </div>
    </div>
  );
}

export default RepositoryCardFooter;
