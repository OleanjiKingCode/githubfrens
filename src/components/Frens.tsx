import { Edge, OnEdgesChange, ReactFlow } from "@xyflow/react";
import { signOut } from "next-auth/react";
import React from "react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { edgeTypes } from "./edges";
import { nodeTypes } from "./nodes";
import { AppNode } from "./nodes/types";

export const Frens = ({
  allNodes,
  allEdges,
  onNodesChange,
  onEdgesChange,
}: {
  allNodes: AppNode[];
  allEdges: Edge[];
  onNodesChange: (changes: any[]) => void;
  onEdgesChange: OnEdgesChange;
}) => {
  //   const handleShareToTwitter = () => {
  //     const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
  //       "Check out your gitfrens on https://githubfrens.vercel.app/"
  //     )}&url=${encodeURIComponent("https://picsum.photos/seed/picsum/200/300")}`;
  //     window.open(twitterUrl, "_blank");
  //   };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-10 backdrop-blur-lg rounded-lg shadow-xl">
      <div className="w-full flex flex-wrap justify-between items-center px:3 md:px-5">
        <div className="hidden md:block"></div>
        <div className="flex items-center gap-2 text-lg md:text-2xl font-bold text-center">
          <FaGithub className="w-6 h-6 md:w-10 md:h-10" />
          <span>Git Frens</span>
        </div>
        <div className="flex gap-2">
          {/* <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={handleShareToTwitter}
          >
            <FaTwitter />
            Share to Twitter
          </button> */}
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      </div>
      <ReactFlow
        nodes={allNodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={allEdges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        fitView
        className="flex items-center justify-center"
        fitViewOptions={{
          padding: 0,
          minZoom: 1,
          maxZoom: 1,
        }}
      />
    </div>
  );
};
