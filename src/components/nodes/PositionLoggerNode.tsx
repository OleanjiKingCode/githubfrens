import { Handle, Position, type NodeProps } from "@xyflow/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { type PositionLoggerNode } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function PositionLoggerNode({ data }: NodeProps<PositionLoggerNode>) {
  const displayedAvatars = data.constributors.contributors.slice(0, 5);
  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
        id="p1"
        key="p1"
        isConnectable
      />
      <div className="w-fit  shadow-lg text-black">
        <div className="border  py-1 px-2 bg-[#fdfdfd] rounded-t-lg">
          <Link
            className="text-xs font-semibold"
            href={data.constributors.repo.url}
            target="_blank"
          >
            {data.constributors.repo.name}
          </Link>
        </div>

        <div className="flex -space-x-3 border  rtl:space-x-reverse py-1 px-2 bg-white rounded-b-lg">
          {displayedAvatars.map((avatar, index) => (
            <Avatar
              key={index}
              className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
            >
              <AvatarImage src={avatar.avatarUrl} alt="@shadcn" />
              <AvatarFallback>{avatar.alias}</AvatarFallback>
            </Avatar>
          ))}
          {data.constributors.contributors.length > 5 && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <a
                  className="flex items-center z-[1000] justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                  href="#"
                >
                  +{data.constributors.contributors.length - 5}
                </a>
              </HoverCardTrigger>
              <HoverCardContent
                className="w-fit bg-black p-1  text-gray-200 rounded-lg text-xs border-zinc-600"
                side="right"
                sideOffset={15}
                avoidCollisions
              >
                <h2 className="text-center">Frens</h2>
                <ScrollArea className="w-36 h-36 max-h-60 bg-black px-2 py-1  ">
                  <div className="flex flex-col space-y-2 p-2">
                    {data.constributors.contributors.map((avatar, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8  rounded-full dark:border-gray-800">
                          <AvatarImage src={avatar.avatarUrl} alt="@shadcn" />
                          <AvatarFallback>{avatar.alias}</AvatarFallback>
                        </Avatar>
                        <Link
                          className="underline"
                          href={avatar.url}
                          target="_blank"
                        >
                          {avatar.login}
                        </Link>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
      </div>
    </div>
  );
}
