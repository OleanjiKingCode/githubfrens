import Image from "next/image";
import { Inter } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Octokit } from "@octokit/rest";
import {
  addEdge,
  applyNodeChanges,
  OnConnect,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { getNodes, nodeTypes } from "@/components/nodes";
import { edgeTypes, initialEdges } from "@/components/edges";
import {
  Contributors,
  AuthenticatedUser,
  AppNode,
} from "@/components/nodes/types";

export default function Home() {
  const { data: session } = useSession();

  const [allNodes, setAllNodes] = useState<AppNode[]>([]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      if (!session) return;

      const octokit = new Octokit({ auth: session.accessToken ?? "" });

      const { data: user } = await octokit.users.getAuthenticated();

      let repos: any = [];
      for (let page = 1; page <= 40; page++) {
        const { data } = await octokit.repos.listForAuthenticatedUser({
          visibility: "all",
          affiliation: "owner,collaborator,organization_member",
          sort: "pushed",
          per_page: 100,
          page,
        });
        repos = repos.concat(data);
      }
      let filteredRepos = repos.filter(
        (i: any) => i.permissions?.push === true
      );

      const collaboratorsData = await Promise.all(
        filteredRepos.map(async (repo: any) => {
          const { data: contributorsData } =
            await octokit.repos.listContributors({
              owner: repo.owner.login,
              repo: repo.name,
            });

          const contributors = Object.values(contributorsData);
          if (contributors.length > 1) {
            const currentDate = new Date();
            const pushedAtDate = new Date(repo.pushed_at);
            const timeDiff = Math.abs(
              currentDate.getTime() - pushedAtDate.getTime()
            );
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

            return {
              repo: {
                name: repo.name,
                description: repo.description,
                url: repo.html_url,
              },
              contributors: contributors
                .filter((con) => con.login !== user.login)
                .map((c) => ({
                  login: c.login,
                  alias: c.login ? `${c.login[0]}${c.login[1]}` : "JD",
                  avatarUrl: c.avatar_url,
                  url: c.html_url,
                })),
              pushedAt: repo.pushed_at,
              daysAgo: daysDiff,
            };
          }
          return null;
        })
      );

      const filteredCollaboratorsData = collaboratorsData.filter(Boolean);
      const totalCollaborators = filteredCollaboratorsData.reduce(
        (count, data) => count + data.contributors.length,
        0
      );

      const result = getNodes({
        user: {
          name: user.login,
          bio: user.bio ?? "",
          avatar_url: user.avatar_url,
          projects: filteredCollaboratorsData.length,
          gitfrens: totalCollaborators,
        },
        contributors: filteredCollaboratorsData,
      });
      setAllNodes(result);
      console.log(result);
      console.log(filteredCollaboratorsData);
    };

    fetchCollaborators();
  }, [session]);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const onNodesChange = useCallback(
    (changes: any[]) =>
      setAllNodes((nds) => {
        const parsedChanges = changes.map((change) => {
          if (change.position) {
            const fixedY = nds.find((node) => change.id === node.id)?.data
              .fixedY;
            if (fixedY) {
              change.position = { x: change.position.x, y: fixedY };
            }
          }
          return change;
        });

        return applyNodeChanges(parsedChanges, nds);
      }),
    [setAllNodes]
  );

  return (
    <>
      {!session ? (
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded"
          onClick={() => signIn("github")}
        >
          Sign in with GitHub
        </button>
      ) : (
        <div className="w-full h-screen flex flex-col items-center justify-center py-10">
          <h1 className="text-2xl font-bold mb-4">Collaborator Diagram</h1>

          <ReactFlow
            nodes={allNodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            fitView
            // defaultViewport={{ x: 500, y: 20, zoom: 1 }}
            // className="flex items-center justify-center"
            // fitViewOptions={{
            //   padding: 0.1,
            //   minZoom: 0.1,
            //   maxZoom: 1,
            // }}
          />
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded mt-4"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      )}
    </>
  );
}
