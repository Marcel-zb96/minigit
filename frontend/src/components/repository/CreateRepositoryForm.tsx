import { CreateRepository, CreateRepositorySchema } from "@/schema/repository.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../FormComponents/FormInput";
import { FormTextArea } from "../FormComponents/FormTextArea";
import { FormSelect } from "../FormComponents/FormSelect";

type CreateRepositoryFormProps = {
  onSubmit: SubmitHandler<CreateRepository>;
};

export const CreateRepositoryForm = ({ onSubmit }: CreateRepositoryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      stargazers_count: 0,
      owner: {
        type: "User",
      },
    },
    resolver: zodResolver(CreateRepositorySchema),
  });

  return (
    <form className="flex flex-col gap-5 md:flex-row md:gap-15" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5 w-full">
        <FormInput type="text" label="Repository name" fieldError={errors.full_name} register={register("full_name")} />
        <FormTextArea label="Description" fieldError={errors.description} register={register("description")} />
        <FormInput type="text" label="Language" register={register("language")} fieldError={errors.language} />
        <FormInput
          type="number"
          label="Startgazers count"
          register={register("stargazers_count", { valueAsNumber: true })}
          fieldError={errors.stargazers_count}
        />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col gap-5">
          <FormInput
            type="text"
            label="User name"
            register={register("owner.login")}
            fieldError={errors.owner?.login}
          />
          <FormSelect label="User type" register={register("owner.type")} options={["User", "Organization"]} />
        </div>
        <button className="border-5 font-bold rounded-md bg-white md:bg-inherit border-white self-center md:self-end p-2 mt-10 w-36 font-stretch-120% text-black md:text-white hover:bg-white hover:text-black">
          Create
        </button>
      </div>
    </form>
  );
};
