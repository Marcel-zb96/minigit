"use client";

import { CreateRepositoryForm } from "@/components/repository/CreateRepositoryForm";
import { createRepository as postRepository } from "@/query/queries";
import { CreateRepository } from "@/schema/repository.schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler } from "react-hook-form";

const CreateRepositoryPage = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: postRepository,
  });

  const onSubmit: SubmitHandler<CreateRepository> = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        router.push("/repositories");
      },
    });
  };

  return (
    <div className="flex flex-col items-center w-full h-full ml-18 md:items-start md:ml-96 ">
      <div className="font-extrabold text-[35px] text-center md:text-[40px] text-white mt-5 mb-10 md:ml-10 md:mb-15 md:mt-8 md:font-stretch-150% ">
        Crearte repository manually
      </div>
      <div className="text-[20px] w-full pr-5 pl-5 pb-10 md:w-10/12 md:pl-15 md:pr-15 md:text-[25px]">
        <CreateRepositoryForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default CreateRepositoryPage;
