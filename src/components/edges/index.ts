import type { Edge, EdgeTypes } from "@xyflow/react";

export const initialEdges: Edge[] = [
  {
    id: "1->2",
    source: "1",
    target: "2",
    animated: true,
    sourceHandle: "b1",
    targetHandle: "p1",
  },
  {
    id: "1->3",
    source: "1",
    target: "3",
    sourceHandle: "b1",
    targetHandle: "p1",
    animated: true,
  },
  {
    id: "1->4",
    source: "1",
    target: "4",
    animated: true,
    sourceHandle: "b1",
    targetHandle: "p1",
  },
];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
