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
import { initialNodes, nodeTypes } from "@/components/nodes";
import { edgeTypes, initialEdges } from "@/components/edges";

export default function Home() {
  const { data: session } = useSession();
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [authenticatedUser, setAuthenticatedUser] = useState({});

  const fetchCollaborators = useMemo(() => async () => {
    if (!session) return;

    const octokit = new Octokit({ auth: session.accessToken ?? "" });

    const { data: user } = await octokit.users.getAuthenticated();
    setAuthenticatedUser({
      name: user.login,
      bio: user.bio,
      avatar_url: user.avatar_url,
    });

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
    console.log(repos);
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
            contributors: contributors.map((c) => ({
              login: c.login,
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
    setCollaborators(filteredCollaboratorsData);
    console.log(filteredCollaboratorsData);
  }, [session]);

  useEffect(() => {
    fetchCollaborators();
  }, [fetchCollaborators]);

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const onNodesChange = useCallback(
    (changes: any[]) =>
      setNodes((nds) => {
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
    [setNodes]
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
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            edgeTypes={edgeTypes}
            onEdgesChange={onEdgesChange}
            fitView
            // defaultViewport={{ x: 500, y: 20, zoom: 1 }}
            className="flex items-center justify-center"
            fitViewOptions={{
              padding: 0.1,
              minZoom: 0.1,
              maxZoom: 1,
            }}
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
