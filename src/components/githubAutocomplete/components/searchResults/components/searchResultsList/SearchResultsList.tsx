import { useMemo } from "react";
import { GithubFetchType, GithubRepository, GithubUser } from "../../hooks/types/useGithubFetch";
import SearchResultsItem from "./components/searchResultsItem/SearchResultsItem";
import styles from "./SearchResultsList.module.scss";
import useKeypadControls from "./hooks/useKeypadControls";
import { classJoin } from "@/helpers/utils";

interface SearchResultsListProps {
  repos: GithubRepository[];
  users: GithubUser[];
  className?: string;
}

export default function SearchResultsList({ repos, users, className }: SearchResultsListProps) {
  const mappedUsers = useMemo(() => users.map(user => ({
    id: user.id,
    name: user.login,
    avatarUrl: user.avatar_url,
    url: user.html_url,
    fetchType: GithubFetchType.USERS,
  })), [users]);

  const mappedRepos = useMemo(() => repos.map(repo => ({
    id: repo.id,
    name: repo.full_name,
    avatarUrl: repo.owner.avatar_url,
    url: repo.html_url,
    fetchType: GithubFetchType.REPOSITORIES,
  })), [repos]);

  const resultsCombined = useMemo(() => {
    const combined = [...mappedUsers, ...mappedRepos];
    return combined.sort((a, b) => a.name.localeCompare(b.name));
  }, [mappedUsers, mappedRepos]);

  const [ref, activeIndex] = useKeypadControls({ results: resultsCombined });

  return (
    <div className={classJoin(styles.SearchResultsList, className)} ref={ref} data-testid="search-results-list">
      {resultsCombined.map((result, idx) => <SearchResultsItem active={idx === activeIndex} key={result.id} {...result} />)}
    </div>
  );
}
