import type { Node, BuiltInNode } from "@xyflow/react";

export type PositionLoggerNode = Node<
  { label: string; fixedY: number },
  "position-logger"
>;
export type GitAvatarNode = Node<
  {
    label: string;
    fixedY: number;
    url: string;
    friendsCount: number;
    projectsCount: number;
  },
  "git-avatar"
>;

export type AppNode = BuiltInNode | PositionLoggerNode | GitAvatarNode;
