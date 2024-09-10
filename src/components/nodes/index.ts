import type { NodeTypes } from "@xyflow/react";
import { PositionLoggerNode } from "./PositionLoggerNode";
import { AppNode, AuthenticatedUser, Contributors } from "./types";
import { GitAvatarNode } from "./GitNodes";



export const getNodes = ({
  user,
  contributors,
}: {
  user: AuthenticatedUser;
  contributors: Contributors[];
}): AppNode[] => {
  return [
    {
      id: "a",
      type: "git-avatar",
      position: { x: 0, y: 1 },
      data: {
        label: user.name,
        fixedY: 1,
        url: user.avatar_url,
        friendsCount: user.gitfrens,
        projectsCount: user.projects,
      },
    },
    {
      id: "b",
      type: "position-logger",
      position: { x: 123, y: 140 },
      data: { label: "1", fixedY: 140 },
    },
    {
      id: "c",
      type: "position-logger",
      position: { x: -71, y: 175 },
      data: { label: "2", fixedY: 175 },
    },
    {
      id: "d",
      type: "position-logger",
      position: { x: -220, y: 190 },
      data: { label: "3", fixedY: 190 },
    },
  ];
};

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "git-avatar": GitAvatarNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
