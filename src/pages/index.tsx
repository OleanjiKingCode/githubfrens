import { FaSpinner } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { Octokit } from "@octokit/rest";
import {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  OnEdgesChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { getNodes } from "@/components/nodes";
import { initialEdges } from "@/components/edges";
import { AppNode } from "@/components/nodes/types";
import { gitfrenDefinitions, loadingMessages } from "@/utils/descriptionData";
import { SignIn } from "@/components/SignIn";
import { Frens } from "@/components/Frens";
import { PiCoffeeBold } from "react-icons/pi";


export default function Home() {
  const { data: session } = useSession();
  const [allNodes, setAllNodes] = useState<AppNode[]>([]);
  const [allEdges, setAllEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [definition, setDefinition] = useState("");

  useEffect(() => {
    const randomDefinition =
      gitfrenDefinitions[Math.floor(Math.random() * gitfrenDefinitions.length)];
    setDefinition(randomDefinition);
  }, []);

  const fetchCollaborators = async () => {
    if (!session) return;
    let currentSession: any = session;
    const octokit = new Octokit({ auth: currentSession.accessToken ?? "" });

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
    setLoading(false);
  };

  useEffect(() => {
    fetchCollaborators();
  }, [session]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setAllEdges((eds) => applyEdgeChanges(changes, eds)),
    [setAllEdges]
  );

  const onNodesChange = useCallback(
    (changes: any[]) =>
      setAllNodes((nds) => {
        const parsedChanges = changes.map((change) => {
          if (change.position) {
            const node = nds.find((node) => change.id === node.id);
            const fixedY = node
              ? "fixedY" in node.data
                ? node.data.fixedY
                : undefined
              : undefined;
            if (fixedY !== undefined) {
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
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center "
      style={{ backgroundImage: "url('/github.webp')" }}
    >
      {!session ? (
        <SignIn definition={definition} />
      ) : loading ? (
        <div className="w-full h-full flex flex-col items-center justify-center max-md:px-10 py-10 backdrop-blur-lg rounded-lg shadow-xl">
          <FaSpinner className="w-10 h-10 md:w-16 md:h-16 animate-spin text-white" />
          <span className="text-lg mt-4 text-center text-white/90">
            {loadingMessages[loadingMessageIndex]}
          </span>
        </div>
      ) : (
        <Frens
          allNodes={allNodes}
          allEdges={allEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        />
      )}
      <footer className="absolute bottom-4 flex flex-col md:flex-row items-center gap-6  text-white text-center">
        <p>
          Created by{" "}
          <a
            href="https://github.com/oleanjikingcode"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-yellow-400"
          >
            OleanjiKingCode
          </a>
        </p>
        <a
          href="https://buymeacoffee.com/oleanji"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white flex items-center hover:text-yellow-400"
        >
          Buy me a coffee
          <PiCoffeeBold className="w-6 h-6 ml-2" />
        </a>
      </footer>
    </div>
  );
}
