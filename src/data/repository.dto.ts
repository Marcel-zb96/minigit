export class UserDto {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

export class ContributionDto {
  author: UserDto;
}

export class RepositoryDto {
  id: number;
  owner: UserDto;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  commits_url: string;
}
