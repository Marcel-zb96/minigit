import RepositoryContribution from "@/components/contribution/RepositoryContribution";
import React, { use } from "react";

type ContributionsProps = { 
  owner: string; 
  name: string; 
  id: string 
}

const Contributions = ({ params }: { params: Promise<ContributionsProps> }) => {
  const resolvedParams = use(params);
  
  return <RepositoryContribution params={resolvedParams} />;
};

export default Contributions;
