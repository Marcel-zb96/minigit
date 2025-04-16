import { CreateRepository, CreateRepositorySchema } from '@/schema/repository.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';

function CreateRepositoryForm({ onSubmit }: {onSubmit: SubmitHandler<CreateRepository>}) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          stargazers_count: 0,
          owner: {
            type: "User",
          }
        },
        resolver: zodResolver(CreateRepositorySchema)
      });

  return (
    <form className="flex flex-col gap-5 md:flex-row md:gap-15" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2 ">
              <label className="pl-1 text-white">Repository name</label>
              <input
                className="h-14 w-full pl-2 bg-white text-black rounded-xl"
                {...register("full_name")}
              />
              {errors.full_name && <span className="text-white p-2 text-[20px] mt-2 font-bold rounded-2xl bg-red-900">{errors.full_name.message}</span>}
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="pl-1 text-white">Description</label>
              <textarea
                className="h-32 w-full p-2 overflow-scroll bg-white rounded-xl"
                {...register("description")}
              />
              {errors.description && <span className="text-white p-2 text-[20px] mt-2 font-bold rounded-2xl bg-red-900">{errors.description.message}</span>}
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="pl-1 text-white">Language</label>
              <input
                className="h-14 w-full pl-2 bg-white text-black rounded-xl"
                {...register("language")}
              />
              {errors.language && <span className="text-white p-2 text-[20px] mt-2 font-bold rounded-2xl bg-red-900">{errors.language.message}</span>}
            </div>

            <div className="flex flex-col gap-2 grow">
              <label className="pl-1 text-white">Startgazers count</label>
              <input type="number"
                className="h-14 w-full pl-2 bg-white text-black rounded-xl"
                {...register("stargazers_count", { valueAsNumber: true })}
              />
              {errors.stargazers_count && <span className="text-white p-2 text-[20px] mt-2 font-bold rounded-2xl bg-red-900">{errors.stargazers_count.message}</span>}
            </div>
          </div>

          <div className="flex flex-col justify-between w-full">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 ">
                <label className="pl-1 text-white">User name</label>
                <input className="h-14 w-full pl-2 bg-white text-black rounded-xl" {...register("owner.login")}/>
                {errors.owner?.login && <span className="text-white p-2 text-[20px] mt-2 max-w-full font-bold rounded-2xl bg-red-900 w-full">{errors.owner.login.message}</span>}
              </div>

              <div className="flex flex-col gap-2 ">
                <label className="pl-1 text-white">User type</label>
                <select className="h-14 w-full pl-2 bg-white text-black rounded-xl" {...register("owner.type")}>
                  <option>User</option>
                  <option>Organization</option>
                </select>
              </div>
            </div>

            <button className="border-5 font-bold rounded-md bg-white md:bg-inherit border-white self-center md:self-end p-2 mt-10 w-36 font-stretch-120% text-black md:text-white hover:bg-white hover:text-black">
              Create
            </button>
          </div>
        </form>
  )
}

export default CreateRepositoryForm