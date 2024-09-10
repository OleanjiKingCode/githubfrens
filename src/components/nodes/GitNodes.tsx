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

      <div className="relative w-[50px] h-[50px] group">
        <div className="absolute w-12 h-12 rounded-full top-0 left-0 transform  transition-all duration-300 group-hover:w-[260px] group-hover:px-4 group-hover:text-white group-hover:translate-x-0 flex flex-col gap-1 items-center justify-center bg-[#fff]  overflow-hidden">
          <span className="font-semibold text-[#2a2a2a] text-[10px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {label}
          </span>
          <div className="flex items-center justify-center w-full font-semibold gap-5 px-5 mx-5 text-[10px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-zinc-500 ">{friendsCount} GitFrens</span>
            <span className="text-zinc-500 ">{projectsCount} Projects</span>
          </div>
        </div>

        <Avatar className="rounded-full w-12 h-12 border border-gray-400 bg-cover bg-center absolute top-0 transform transition-all duration-300">
          <AvatarImage src={url} alt="User Avatar" />
          <AvatarFallback>{`${label[0]}${label[1]}`}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
