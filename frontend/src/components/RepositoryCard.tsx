import { RepositoryCardType } from "@/app/repositories/page";
import React from "react";

function RepositoryCard({ data }: { data: RepositoryCardType }) {
  return (
    <div className="flex flex-col p-3 justify-between bg-indigo-900 text-white rounded-3xl hover:shadow-[2px_2px_5px] hover:shadow-emerald-500 w-1/4 h-[35vh] max-h-72">
      <div className="flex flex-col justify-start">
        <div className="flex flex-row justify-start">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="white" className="size-15 mr-1.5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 6.375c0 2.28-3.69 4.13-8.25 4.13S3.75 8.65 3.75 6.38c0-2.28 3.69-4.13 8.25-4.13s8.25 1.85 8.25 4.13v11.25c0 2.28-3.69 4.13-8.25 4.13s-8.25-1.85-8.25-4.13V6.38m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75c0 2.28-3.69 4.13-8.25 4.13s-8.25-1.85-8.25-4.13v-3.75c0 2.28 3.69 4.13 8.25 4.13s8.25-1.85 8.25-4.13"
            />
          </svg>
          <div className="flex flex-col justify-start">
            <div className="text-3xl font-medium">{data.full_name}</div>
            <div className="font-extralight">{data.owner.login}</div>
          </div>
        </div>
        <div className="text-sm font-extralight mt-2 max-h-36 overflow-y-scroll">{data.description}</div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col justify-end">
            <div className="flex flex-col mt-3 text-sm font-bold">
              <div className="flex flex-row">
                <svg fill="currentColor" strokeWidth={0.5} className="mr-2 size-4" viewBox="0 0 16 12">
                  <path d="M14 5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                  <path d="M13 10.25h1v1h-1zM13 8.25h1v1h-1zM8 8.25h1v1H8zM10 8.25h2v1h-2zM11 10.25h1v1h-1zM6 8.25h1v1H6zM4 8.25h1v1H4zM2 8.25h1v1H2zM13 6.25h1v1h-1zM11 6.25h1v1h-1zM9 6.25h1v1H9zM7 6.25h1v1H7zM5 6.25h1v1H5zM2 6.25h2v1H2zM2 10.25h1v1H2zM4 10.25h6v1H4z" />
                </svg>
                <div>{data.language}</div>
              </div>
              <div className="flex flex-row">
                <svg viewBox="0 0 25 20" fill="currentColor" className="size-4 mr-2 text-emerald-300">
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>{data.stargazers_count}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <div className="flex flex-row justify-end">
              <div className="text-sm font-extralight mr-2">Contributions: </div>
              <div className="text-sm font-bold text-emerald-300">{data._count.contribution}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepositoryCard;
