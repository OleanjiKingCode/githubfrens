import { Handle, Position, type NodeProps } from "@xyflow/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { type PositionLoggerNode } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function PositionLoggerNode({ data }: NodeProps<PositionLoggerNode>) {
  // Dummy avatar data
  const avatars = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alex Johnson" },
    { id: 4, name: "Chris Evans" },
    { id: 5, name: "Mary Jane" },
    { id: 6, name: "Mark Ruffalo" },
    { id: 7, name: "Scarlett Witch" },
    { id: 8, name: "Bruce Banner" },
    { id: 9, name: "Tony Stark" },
    { id: 10, name: "Steve Rogers" },
    // More avatars to simulate +21
    ...Array.from({ length: 11 }, (_, i) => ({
      id: 11 + i,
      name: `User ${11 + i}`,
    })),
  ];

  const displayedAvatars = avatars.slice(0, 5);
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
          <h3 className="text-xs font-semibold">Avatar Group</h3>
        </div>

        <div className="flex -space-x-3 border  rtl:space-x-reverse py-1 px-2 bg-white rounded-b-lg">
          {displayedAvatars.map((avatar) => (
            <Avatar
              key={avatar.id}
              className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
            >
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{avatar.name}</AvatarFallback>
            </Avatar>
          ))}

          <HoverCard>
            <HoverCardTrigger asChild>
              <a
                className="flex items-center z-10 justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                href="#"
              >
                +99
              </a>
            </HoverCardTrigger>
            <HoverCardContent
              className="w-fit bg-black p-1 text-gray-200 rounded-lg text-xs border-zinc-600"
              side="right"
              sideOffset={15}
            >
              <ScrollArea className="w-32 h-36 max-h-60 bg-black px-2 py-1  ">
                <div className="flex flex-col space-y-2 p-2">
                  {avatars.map((avatar) => (
                    <div key={avatar.id} className="underline">
                      {avatar.name}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  );
}
