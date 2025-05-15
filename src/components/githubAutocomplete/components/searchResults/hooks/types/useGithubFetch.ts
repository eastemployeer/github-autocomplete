import { components } from '@octokit/openapi-types';

export enum GithubFetchType {
  USERS = "users",
  REPOSITORIES = "repositories",
}

export type GithubUser = components['schemas']['simple-user'];
export type GithubRepository = components['schemas']['repository'];

export interface GithubSearchUsersGetResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
}
export interface GithubSearchRepositoriesGetResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepository[];
}

export interface GithubSearchResponse {
  repositories: GithubSearchRepositoriesGetResponse;
  users: GithubSearchUsersGetResponse;
}

export interface GithubSearchRequest {
  q: string;
  per_page: number;
}
