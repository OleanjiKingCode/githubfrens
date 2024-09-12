import type { NodeTypes } from "@xyflow/react";
import { ReposNode } from "./ReposNode";
import { AppNode, AuthenticatedUser, Contributors } from "./types";
import { GitAvatarNode } from "./GitNodes";

export const nodeTypes = {
  "repos-node": ReposNode,
  "git-avatar": GitAvatarNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;

export const getNodes = ({
  user,
  contributors,
}: {
  user: AuthenticatedUser;
  contributors: Contributors[];
}): AppNode[] => {
  const data: any[] = [];

  const spacing = 100;
  const xPositions = Array.from({ length: contributors.length }, (_, i) => {
    const offset = (contributors.length - 1) / 2;
    return (i - offset) * spacing;
  });
  const possibleYPositions = [290, 410, 500, 350, 450];
  let lastPos: number = 0;

  const getNextPos = () => {
    let nextVal = lastPos;
    lastPos === 4 ? (lastPos = 0) : lastPos++;
    return possibleYPositions[nextVal];
  };
  for (let index = 0; index < contributors.length; index++) {
    let yPos = getNextPos();
    data.push({
      id: `${index + 2}`,
      type: "repos-node",
      position: {
        x: xPositions[index],
        y: yPos,
      },
      data: {
        label: contributors[index].repo.name,
        fixedY: yPos,
        constributors: contributors[index],
      },
    });
  }

  return [
    {
      id: "1",
      type: "git-avatar",
      position: { x: 0, y: 1 },
      data: {
        label: user.name,
        url: user.avatar_url,
        bio: user.bio,
        friendsCount: user.gitfrens,
        projectsCount: user.projects,
      },
    },
    ...data,
  ];
};
