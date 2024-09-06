import Image from "next/image";
import { Inter } from "next/font/google";
import CollaboratorDiagram from "../components/CollaboratorDiagram";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";

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
    console.log(session);
  }, [session]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      if (!session) return;

      console.log(session);

      // const octokit = new Octokit({ auth: session.accessToken });

      // const { data: repos } = await octokit.repos.listForAuthenticatedUser({
      //   visibility: "all",
      //   affiliation: "owner,collaborator",
      // });

      // const collaboratorsData = await Promise.all(
      //   repos.map(async (repo) => {
      //     const { data: collaborators } = await octokit.repos.listCollaborators({
      //       owner: repo.owner.login,
      //       repo: repo.name,
      //     });

      //     return collaborators.map((collaborator) => ({
      //       name: collaborator.login,
      //       repo: repo.name,
      //       collaborationDate: new Date(repo.created_at),
      //     }));
      //   })
      // );

      // setCollaborators(collaboratorsData.flat());
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
