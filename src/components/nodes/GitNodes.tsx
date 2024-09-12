import { Handle, Position, type NodeProps } from "@xyflow/react";
import { type GitAvatarNode } from "./types";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function GitAvatarNode({ data }: NodeProps<GitAvatarNode>) {
  const { label, url, friendsCount, projectsCount } = data;
  return (
    <div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b1"
        key="b1"
        isConnectable
      />

      <div className="relative w-[100px] h-[100px] group">
        <div className="absolute w-[98px] h-[98px] rounded-full top-0 left-0 transform  transition-all duration-300 group-hover:w-[450px] group-hover:px-4 group-hover:text-white group-hover:translate-x-0 flex flex-col gap-1 py-1  items-center  bg-[#fff]  overflow-hidden">
          <span className="font-semibold text-[#2a2a2a]  opacity-0 transition-opacity duration-300 group-hover:opacity-100 ">
            {label}
          </span>
          {data.bio && (
            <span className="text-zinc-500 text-[10px]">{data.bio}</span>
          )}
          <div className="flex items-center justify-center w-full font-semibold gap-5 mt-3 px-5 mx-5 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-zinc-500 ">{friendsCount} GitFrens</span>
            <span className="text-zinc-500 ">{projectsCount} OSS Projects</span>
          </div>
        </div>

        <Avatar className="rounded-full w-[98px] h-[98px] border border-gray-400 bg-cover bg-center absolute top-0 transform transition-all duration-300">
          <AvatarImage src={url} alt="User Avatar" className="bg-white" />
          <AvatarFallback className="text-[#2a2a2a]">{`${label[0]}${label[1]}`}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
