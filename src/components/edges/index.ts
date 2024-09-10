import type { Edge, EdgeTypes } from "@xyflow/react";

export const initialEdges: Edge[] = [
  {
    id: "a->b",
    source: "a",
    target: "b",
    animated: true,
    sourceHandle: "b1",
    targetHandle: "p1",
  },
  {
    id: "a->c",
    source: "a",
    target: "c",
    sourceHandle: "b1",
    targetHandle: "p1",
    animated: true,
  },
  {
    id: "a->d",
    source: "a",
    target: "d",
    animated: true,
    sourceHandle: "b1",
    targetHandle: "p1",
  },
];

export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
