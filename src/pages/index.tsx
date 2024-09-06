import Image from "next/image";
import { Inter } from "next/font/google";
import CollaboratorDiagram from "../components/CollaboratorDiagram";

const inter = Inter({ subsets: ["latin"] });

const collaborators = [
  { name: "Collaborator 1", collaborationDate: new Date("2022-01-01") },
  { name: "Collaborator 2", collaborationDate: new Date("2021-06-01") },
  { name: "Collaborator 3", collaborationDate: new Date("2023-03-01") },
];

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Collaborator Diagram</h1>
      <CollaboratorDiagram owner="Your Name" collaborators={collaborators} />
    </div>
  );
}