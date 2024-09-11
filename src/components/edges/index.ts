import type { Edge, EdgeTypes } from "@xyflow/react";

export const initialEdges = (count: number): Edge[] => {
  return Array.from({ length: count }, (_, i) => {
    const target = i + 2;
    return {
      id: `1->${target}`,
      source: "1",
      target: target.toString(),
      animated: true,
      sourceHandle: "b1",
      targetHandle: "p1",
    };
  });
};

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
