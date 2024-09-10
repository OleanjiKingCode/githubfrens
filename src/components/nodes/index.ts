import type { NodeTypes } from "@xyflow/react";
import { PositionLoggerNode } from "./PositionLoggerNode";
import { AppNode, AuthenticatedUser, Contributors } from "./types";
import { GitAvatarNode } from "./GitNodes";

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
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

  const getRandomNumber = (min: number, max: number, gap: number) => {
    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (randomNum - min < gap);

    return randomNum;
  };
  for (let index = 0; index < contributors.length; index++) {
    let yPos = getRandomNumber(50, 400, 100);
    data.push({
      id: `${index + 2}`,
      type: "position-logger",
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
        fixedY: 1,
        url: user.avatar_url,
        bio: user.bio,
        friendsCount: user.gitfrens,
        projectsCount: user.projects,
      },
    },
    ...data,
  ];
};
