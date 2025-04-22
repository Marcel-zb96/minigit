"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function LangSelect() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/") || "/";

    router.push(newPath);
  };

  return (
    <div className="flex flex-col grow justify-end md:justify-center md:flex-row items-end gap-3 p-2 w-full md:h-20 mb-10 mt-5 text-black ">
      <select id={"localisation"} className="font-bold rounded-2xl bg-blue-200 p-2 md:p-3 text-[20px]" value={locale} onChange={handleChange}>
        <option className="text-[15px] md:text-[20px]" value="en">EN</option>
        <option className="text-[15px] md:text-[20px]" value="es">ES</option>
        <option className="text-[15px] md:text-[20px]" value="de">DE</option>
        <option className="text-[15px] md:text-[20px]" value="hu">HU</option>
      </select>
      <div className="font-extralight text-[10px] "></div>
    </div>
  );
}

export default LangSelect;
