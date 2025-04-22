"use client";

import { fetchUsers } from "@/query/queries";
import { UserResponse } from "@/schema/user.schema";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const Users = () => {
  const { data, isSuccess } = useQuery<UserResponse[]>({ queryKey: ["users"], queryFn: fetchUsers });

  if (!isSuccess) return;

  return (
    <div className="flex flex-col items-center w-full h-full md:items-start md:ml-96 ">
      <div className="font-extrabold text-[40px] text-white ml-15 mt-5 mb-10 md:mb-15 md:mt-8 md:font-stretch-150%">
        User List
      </div>
      <div className="ml-18 md:ml-22 mb-15 grid grid-cols-3 md:mr-20 bg-indigo-900 text-white text-sm md:text-2xl rounded-4xl w-9/12 md:w-4/6 font-extrabold font-stretch-120%">
        <div className="h-15 md:h-20 flex justify-center items-center border-r-2 border-b-2 ">Avatar</div>
        <div className="h-15 md:h-20 flex justify-center items-center border-b-2 ">Login</div>
        <div className="h-15 md:h-20 flex justify-center items-center border-b-2 border-l-2 ">Type</div>
        {data.map((user) => {
          return (
            <div key={user!.login} className="contents last:[&>div]:border-b-0">
              <div className="h-20 md:h-30 border-b-2 border-r-2 flex justify-center items-center font-extralight">
                {user.avatar_url ? (
                  <div className="relative aspect-square w-15 h-15 md:w-25 md:h-25 ">
                    <Image
                      src={user.avatar_url}
                      alt="profile picture"
                      fill
                      sizes="w-full h-full"
                      className="rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="text-sm md:text-2xl md:pl-2 md:pr-2 text-center">No profile picture</div>
                )}
              </div>
              <div className="h-20 md:h-30 border-b-2 flex justify-center items-center font-extralight">
                {user!.login}
              </div>
              <div className="h-20 md:h-30 border-b-2 border-l-2 flex justify-center items-center font-extralight">
                {user!.type}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
