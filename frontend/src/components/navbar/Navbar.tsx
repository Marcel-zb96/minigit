"use client";

import { BootCampIcon } from "@/assets/BootCampIcon";
import { PlusIcon } from "@/assets/PlusIcon";
import { RepositoryIcon } from "@/assets/RepositoryIcon";
import { UserIcon } from "@/assets/UserIcon";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { twMerge } from "tailwind-merge";

export const Navbar = () => {
  const pathname = usePathname();

  const isOnPage = (path: string): boolean => {
    return pathname.startsWith(path);
  };

  const t = useTranslations("Navbar");

  return (
    <div className="flex flex-col fixed justify-start md:w-96 h-full bg-blue-950">
      <div className="flex flex-col md:flex-row justify-center gap-3 md:justify-start p-2 items-center w-full md:h-20 md:ml-7 mb-10 mt-5 text-white ">
        <BootCampIcon />
        <div className="hidden md:block font-extrabold font-stretch-125% text-[40px] ">BootCamp</div>
      </div>

      <div className="flex flex-col">
        <Link
          href={"/repositories"}
          className={twMerge(
            "flex flex-col md:flex-row justify-center md:justify-start md:pl-8 items-center w-full text-white p-2 md:hover:brightness-110 md:hover:bg-white/10",
            clsx({ "text-emerald-600": isOnPage("/repositories") })
          )}
        >
          <RepositoryIcon />
          <div className="hidden md:block md:ml-4 font-extralight text-3xl ">{t("repos")}</div>
        </Link>

        <Link
          href={"/create"}
          className={twMerge(
            "flex flex-col md:flex-row justify-center md:justify-start md:pl-8 items-center w-full text-white p-2 md:hover:bg-white/10",
            clsx({ "text-emerald-600": isOnPage("/create") })
          )}
        >
          <PlusIcon />
          <div className="hidden md:block md:ml-4 font-extralight text-3xl">{t("add")}</div>
        </Link>

        <Link
          href={"/users"}
          className={twMerge(
            "flex flex-col md:flex-row justify-center md:justify-start md:pl-8.5 items-center w-full text-white p-2 md:hover:bg-white/10",
            clsx({ "text-emerald-600": isOnPage("/users") })
          )}
        >
          <UserIcon />
          <div className="hidden md:block md:ml-3 font-extralight text-3xl">{t("users")}</div>
        </Link>
      </div>
    </div>
  );
};
