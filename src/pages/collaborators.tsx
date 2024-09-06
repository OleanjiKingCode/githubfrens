import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Octokit } from "@octokit/rest";
import CollaboratorDiagram from "@/components/CollaboratorDiagram";

const CollaboratorsPage = () => {
  return <CollaboratorDiagram owner={"OLEANJI"} collaborators={[]} />;
};

export default CollaboratorsPage;
