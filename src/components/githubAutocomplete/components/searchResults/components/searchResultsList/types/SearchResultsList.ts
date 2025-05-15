import { GithubFetchType } from "../../../hooks/types/useGithubFetch";

export interface SearchResultItem {
  id: number;
  name: string;
  avatarUrl: string;
  url: string;
  fetchType: GithubFetchType;
}
