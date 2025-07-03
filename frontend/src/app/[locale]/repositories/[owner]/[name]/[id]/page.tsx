import RepositoryContribution from "@/components/contribution/RepositoryContribution";

type ContributionsProps = { 
  owner: string; 
  name: string; 
  id: string 
}

const Contributions = async ({ params }: { params: Promise<ContributionsProps> }) => {
  const resolvedParams = await params;
  
  return <RepositoryContribution params={resolvedParams} />;
};

export default Contributions;
