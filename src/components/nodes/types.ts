import type { Node, BuiltInNode } from "@xyflow/react";

export interface AuthenticatedUser {
  name: string;
  bio: string;
  avatar_url: string;
  projects: number;
  gitfrens: number;
}

export interface Contributors {
  repo: {
    name: string;
    description: string;
    url: string;
  };
  contributors: {
    login: string;
    alias: string;
    avatarUrl: string;
    url: string;
  }[];
  pushedAt: string;
  daysAgo: number;
}

export type PositionLoggerNode = Node<
  {
    label: string;
    fixedY: number;
    constributors: Contributors;
  },
  "position-logger"
>;
export type GitAvatarNode = Node<
  {
    label: string;
    url: string;
    bio: string;
    friendsCount: number;
    projectsCount: number;
  },
  "git-avatar"
>;

export type AppNode = BuiltInNode | PositionLoggerNode | GitAvatarNode;
