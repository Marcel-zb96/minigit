import React from "react";

function CreateRepository() {
  return (
    <div className="flex flex-col items-center w-full h-full ml-18 md:items-start md:ml-96 ">
      <div className="font-extrabold text-[35px] text-center md:text-[40px] text-white mt-5 mb-10 md:ml-10 md:mb-15 md:mt-8 md:font-stretch-150% ">
        Crearte repository manually
      </div>
      <div className="text-[20px] w-full pr-5 pl-5 pb-10 md:w-10/12 md:pl-15 md:pr-15 md:text-[25px]">
        <form className="flex flex-col gap-5 md:flex-row md:gap-15">
          <div className="flex flex-col gap-5 grow">
            <div className="flex flex-col gap-2 ">
              <label className="pl-1 text-white">Repository name</label>
              <input className="h-14 w-full pl-2 bg-white text-black rounded-xl"></input>
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="pl-1 text-white">Description</label>
              <textarea className="h-32 w-full p-2 overflow-scroll bg-white rounded-xl"></textarea>
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="pl-1 text-white">Language</label>
              <input className="h-14 w-full pl-2 bg-white text-black rounded-xl"></input>
            </div>

            <div className="flex flex-col gap-2 ">
              <label className="pl-1 text-white">Startgazers count</label>
              <input className="h-14 w-full pl-2 bg-white text-black rounded-xl"></input>
            </div>
          </div>

          <div className="flex flex-col justify-between grow">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2 ">
                <label className="pl-1 text-white">User name</label>
                <input className="h-14 w-full pl-2 bg-white text-black rounded-xl"></input>
              </div>

              <div className="flex flex-col gap-2 ">
                <label className="pl-1 text-white">User type</label>
                <select className="h-14 w-full pl-2 bg-white text-black rounded-xl">
                  <option>User</option>
                  <option>Organisation</option>
                </select>
              </div>
            </div>

            <button className="border-5 font-bold rounded-md bg-white md:bg-inherit border-white self-center md:self-end p-2 mt-10 w-36 font-stretch-120% text-black md:text-white hover:bg-white hover:text-black">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRepository;
