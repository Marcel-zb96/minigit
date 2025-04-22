import { ContributionResponse } from "@/schema/contribution.schema";
import { CreateRepository, RepositoryResponse } from "@/schema/repository.schema";
import { UserResponse } from "@/schema/user.schema";

export const fetchRepositories = async (searchString: string): Promise<RepositoryResponse[]> => {
    const queryParam = {
        url: `repositories?q=${searchString}`,
        method: "GET",
    }
    const response = await query(queryParam);
    return await response.json();
}

export const fetchUsers = async (): Promise<UserResponse[]> => {
    const queryParam = {
        url: `users`,
        method: "GET",
    }
    const response = await query(queryParam);
    return await response.json();
}

export const fechContributions = async (repositoryId: string): Promise<ContributionResponse[]> => {
    const queryParam = {
        url: `repositories/${repositoryId}/contributions`,
        method: "GET",
    }
    const response = await query(queryParam);
    return await response.json();
}

export const createRepository = async (newRepository: CreateRepository): Promise<RepositoryResponse> => {
    const queryParam = {
        url: 'repositories',
        method: "POST",
        body: JSON.stringify(newRepository),
    }
    const response = await query(queryParam);
    return await response.json();
}

type QueryParams = {
    url: string;
    method: string;
    body?: string,
};

const query = async ({ url, method, body }: QueryParams): Promise<Response> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body,
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}
