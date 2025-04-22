"use client";

import { BackIcon } from "@/assets/BackIcon";
import { fechContributions } from "@/query/queries";
import { ContributionResponse } from "@/schema/contribution.schema";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { Usable, use } from "react";

const Contributions = ({ params }: { params: Usable<{ owner: string; name: string; id: string }> }) => {
  const { owner, name, id } = use(params);

  const t = useTranslations('ContributionsPage');

  const { data, isSuccess } = useQuery<ContributionResponse[]>({
    queryKey: ["contributions", id],
    queryFn: () => fechContributions(id),
  });
  
  if (!isSuccess) return;

  return (
    <div className="flex flex-col items-center w-full h-full md:items-start md:ml-96">
      <div className="flex flex-col md:flex-row font-extrabold text-[40px] gap-10 text-white ml-15 mt-5 mb-10 items-center md:mb-15 md:mt-8 md:font-stretch-150%">
        <div className="md:contents flex flex-row w-2/3 self-center md:self-auto max-h-24 md:max-h-52 items-center justify-center gap-8 text-3xl md:text-[40px]">
          <Link href={"/repositories"}>
            <BackIcon />
          </Link>
          <div>{`${owner}/${name}`}</div>
        </div>
        <div className="hidden md:block">{"-"}</div>
        <div className="text-emerald-500 self-center">{t('title')}</div>
      </div>
      <div className="ml-18 md:ml-22 mb-15 grid grid-cols-2 md:mr-20 bg-indigo-900 text-white text-sm md:text-2xl rounded-4xl w-9/12 md:w-1/3 md:min-w-2xl font-extrabold font-stretch-120%">
        <div className="h-24 flex justify-center items-center  border-r-2 border-b-2">{t('userNameHeader')}</div>
        <div className="h-24 flex justify-center items-center border-b-2 ">{t('lineCountHeader')}</div>
        {data.length > 0 ? (
          data.map((contribution) => {
            return (
              <div key={contribution.id} className="contents last:[&>div]:border-b-0">
                <div className="h-24 border-b-2 border-r-2 flex justify-center items-center font-extralight">
                  {contribution.user.login}
                </div>
                <div className="h-24 border-b-2 flex justify-center items-center font-extralight">
                  {contribution.line_count}
                </div>
              </div>
            );
          })
        ) : (
          <div key={"-"} className="contents last:[&>div]:border-b-0">
            <div className="h-24 border-b-2 border-r-2 flex justify-center items-center font-extralight">-</div>
            <div className="h-24 border-b-2 flex justify-center items-center font-extralight">-</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contributions;
