import { Handle, Position, type NodeProps } from "@xyflow/react";
import { type GitAvatarNode } from "./types";
import Image from "next/image";

export function GitAvatarNode({ data }: NodeProps<GitAvatarNode>) {
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
        <div className="absolute w-12 h-12 rounded-full top-0 left-0 transform  transition-all duration-300 group-hover:w-[260px] group-hover:px-4 group-hover:text-white group-hover:translate-x-0 flex flex-col gap-1 items-center justify-center bg-[#d4af37]  overflow-hidden">
          <span className="font-semibold text-[#2a2a2a] text-[10px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Oleanji
          </span>
          <div className="flex items-center justify-center w-full gap-5 px-5 mx-5 text-[10px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-[#f0f0f0] ">49 GitFrens</span>
            <span className="text-[#f0f0f0] ">30 Projects</span>
          </div>
        </div>
        <div
          className="rounded-full w-12 h-12 border border-gray-400 bg-cover bg-center absolute top-0 transform transition-all duration-300"
          style={{ backgroundImage: `url(${data.url})` }}
        ></div>
      </div>
    </div>
  );
}
