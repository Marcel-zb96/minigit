import { ContributionResponse } from "@/schema/contribution.schema";
import { CreateRepository, RepositoryResponse } from "@/schema/repository.schema";
import { UserResponse } from "@/schema/user.schema";

export async function fetchRepositories(searchString: string): Promise<RepositoryResponse[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/repositories?q=${searchString}`)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json();
}

export async function fetchUsers(): Promise<UserResponse[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export async function fechContributions(repositoryId: string): Promise<ContributionResponse[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/repositories/${repositoryId}/contributions`);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

export async function createRepository(newRepository: CreateRepository): Promise<RepositoryResponse> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/repositories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRepository),
    })
    const savedRepository: RepositoryResponse = await response.json();
    return savedRepository;
}
