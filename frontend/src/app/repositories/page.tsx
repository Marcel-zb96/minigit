import RepositoryCard from '@/components/RepositoryCard'
import React from 'react'

export type RepositoryCardType = {
    id: string;
    full_name: string;
    owner: { login: string; };
    description: string;
    language: string;
    stargazers_count: number;
    _count: { contribution: number; };
}

const repositories: RepositoryCardType[] = [
    {
        id: "thisisanid",
        full_name: 'full_name',
        owner: {
            login: "Owner",
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        language: "NodeJS",
        stargazers_count: 756,
        _count: {
            contribution: 12900000
        },
    },
    {
        id: "thisisanid",
        full_name: 'full_name',
        owner: {
            login: "Owner",
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        language: "NodeJS",
        stargazers_count: 756,
        _count: {
            contribution: 12900000
        },
    },
    {
        id: "thisisanid",
        full_name: 'full_name',
        owner: {
            login: "Owner",
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        language: "NodeJS",
        stargazers_count: 756,
        _count: {
            contribution: 12900000
        },
    },
    {
        id: "thisisanid",
        full_name: 'full_name',
        owner: {
            login: "Owner",
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        language: "NodeJS",
        stargazers_count: 756,
        _count: {
            contribution: 12900000
        },
    },
    {
        id: "thisisanid",
        full_name: 'full_name',
        owner: {
            login: "Owner",
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        language: "NodeJS",
        stargazers_count: 756,
        _count: {
            contribution: 12900000
        },
    },
    {
        id: "thisisanid",
        full_name: 'full_name',
        owner: {
            login: "Owner",
        },
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        language: "NodeJS",
        stargazers_count: 756,
        _count: {
            contribution: 12900000
        },
    },
]

export default function Repository() {
  return (
    <div>
        <div className='flex flex-wrap gap-4 bg-indigo-700'>
            {repositories.map((repository) => {
                return <RepositoryCard key={repository.id} data={repository} />
            })}
        </div>
    </div>
  )
};