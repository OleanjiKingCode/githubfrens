import Image from "next/image";
import { Inter } from "next/font/google";
import CollaboratorDiagram from "../components/CollaboratorDiagram";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest";

const inter = Inter({ subsets: ["latin"] });

const collaborators = [
  { name: "Collaborator 1", collaborationDate: new Date("2022-01-01") },
  { name: "Collaborator 2", collaborationDate: new Date("2021-06-01") },
  { name: "Collaborator 3", collaborationDate: new Date("2023-03-01") },
];

export default function Home() {
  const { data: session } = useSession();
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      if (!session) return;

      console.log(session);

      const octokit = new Octokit({ auth: session.accessToken ?? "" });

      let repos: Octokit.ReposListForAuthenticatedUserResponseItem[] = [];
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

      let filteredRepos = repos.filter((i) => i.permissions?.push === true);

      const collaboratorsData = await Promise.all(
        filteredRepos.map(async (repo) => {
          const { data: contributorsData } =
            await octokit.repos.listContributors({
              owner: repo.owner.login,
              repo: repo.name,
            });

          const contributors = Object.values(contributorsData);
          let allContributors = [];
          if (contributors.length > 1) {
            allContributors.push({
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
            });
          }
          return allContributors;
        })
      );

      const filteredCollaboratorsData = collaboratorsData.filter(
        (i) => i.length > 0
      );
      console.log(filteredCollaboratorsData);
    };

    fetchCollaborators();
  }, [session]);
  return (
    <div className="container mx-auto">
      {!session ? (
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded"
          onClick={() => signIn("github")}
        >
          Sign in with GitHub
        </button>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-4">Collaborator Diagram</h1>
          {/* <CollaboratorDiagram collaborators={collaborators} /> */}
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded mt-4"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
