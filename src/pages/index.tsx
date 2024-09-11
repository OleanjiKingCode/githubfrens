import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Octokit } from "@octokit/rest";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  OnConnect,
  OnEdgesChange,
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
  const [allEdges, setAllEdges] = useState<Edge[]>([]);

  const gitfrenDefinitions = [
    "A Gitfren is a peer coder who collaborates with you to push the boundaries of open-source contributions.",
    "Gitfren: Your trusted ally in code, always ready to merge minds and repositories.",
    "A Gitfren is a fellow open-source enthusiast, contributing lines of code and bytes of brilliance.",
    "Gitfren: The teammate who reviews your pull requests and squashes bugs by your side.",
    "A Gitfren is a co-committer dedicated to refining the art of open-source development.",
    "Gitfren: A digital partner in the endless loop of coding, debugging, and versioning.",
    "A Gitfren is the contributor who builds features and fixes bugs while you conquer the command line.",
    "A Gitfren is that one coder who makes you feel better about your commit history... and your coffee consumption.",
    "Gitfren: The hero you didn't ask for but definitely needed when that merge conflict hits at 3 AM.",
    "A Gitfren is the open-source buddy who'll write code with you, and maybe sneak in a meme or two in the comments.",
    "Gitfren: The pal who reviews your pull request but won’t judge you for 100 commits just to fix one typo.",
    "A Gitfren is a co-conspirator in the never-ending saga of bugs, features, and 'one last deploy'.",
    "Gitfren: Your ride-or-die in code, equally skilled in writing functions and delivering sarcastic code reviews.",
    "A Gitfren is the teammate who merges your code and your bad puns into the project, no questions asked.",
  ];

  const [definition, setDefinition] = useState("");

  useEffect(() => {
    const randomDefinition =
      gitfrenDefinitions[Math.floor(Math.random() * gitfrenDefinitions.length)];
    setDefinition(randomDefinition);
  }, []);

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
    let filteredRepos = repos.filter((i: any) => i.permissions?.push === true);

    const collaboratorsData = await Promise.all(
      filteredRepos.map(async (repo: any) => {
        const { data: contributorsData } = await octokit.repos.listContributors(
          {
            owner: repo.owner.login,
            repo: repo.name,
          }
        );

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

    const edges = initialEdges(result.length);
    setAllNodes(result);
    setAllEdges(edges);
    console.log(result);
    console.log(filteredCollaboratorsData);
  };

  useEffect(() => {
    fetchCollaborators();
  }, [session]);

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setAllEdges((eds) => applyEdgeChanges(changes, eds)),
    [setAllEdges]
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
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/github.webp')" }}
    >
      {!session ? (
        <div className="flex flex-col items-center w-full h-full py-[15%] gap-20 backdrop-blur-lg rounded-lg shadow-xl">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-3xl font-bold text-center">
              <FaGithub className="w-10 h-10" />
              <span>Meet Your Git Frens</span>
            </div>
            <span className="text-lg text-center">{definition}</span>
          </div>
          <div className="flex flex-col items-center gap-6 mt-10">
            <span className="text-base text-center text-gray-500">
              Ready to dive into your open-source collaborations? Go meet your
              GitFrens!
            </span>
            <button
              className="bg-gray-800 text-white px-5 py-3 rounded-md hover:bg-gray-700 transition duration-150 ease-in-out"
              onClick={() => signIn("github")}
            >
              Sign in with GitHub
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center py-10">
          <div className="w-full flex justify-between items-center px-5">
            <div></div>
            <div className="flex items-center gap-2 text-2xl font-bold text-center">
              <FaGithub className="w-10 h-10" />
              <span>Your Git Frens</span>
            </div>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded"
              onClick={() => signOut()}
            >
              Sign out
            </button>
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
              minZoom: 0.1,
              maxZoom: 1,
            }}
          />
        </div>
      )}
    </div>
  );
}
