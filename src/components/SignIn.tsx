import { signIn } from "next-auth/react";
import React from "react";
import { FaGithub } from "react-icons/fa";

export const SignIn = ({ definition }: { definition: string }) => {
  return (
    <div className="flex flex-col items-center w-full h-full py-[15%] max-md:px-10 max-md:justify-center gap:10 md:gap-20 backdrop-blur-lg rounded-lg shadow-xl">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 text-lg  md:text-3xl font-bold text-center">
          <FaGithub className="w-10 h-10" />
          <span>Git Frens</span>
        </div>
        <span className="text-base md:text-lg text-center">{definition}</span>
      </div>
      <div className="flex flex-col items-center gap-6 mt-10">
        <span className="text-base text-center text-gray-500">
          Ready to dive into your open-source collaborations? Go meet your
          GitFrens!
        </span>
        <button
          className="bg-gray-800 text-white px-5 py-3 rounded-md hover:bg-gray-700 transition duration-150 ease-in-out"
          onClick={() => signIn("github")}
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};
