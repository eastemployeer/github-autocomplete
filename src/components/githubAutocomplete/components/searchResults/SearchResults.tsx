import useGithubFetch from "./hooks/useGithubFetch";
import { GithubFetchType } from "./hooks/types/useGithubFetch";
import Loader from "./components/loader/Loader";
import ErrorBox from "./components/errorBox/ErrorBox";
import SearchDisabledBox from "./components/searchDisabledBox/SearchDisabledBox";
import SearchResultsList from "./components/searchResultsList/SearchResultsList";
import SearchResultsEmpty from "./components/searchResultsEmpty/SearchResultsEmpty";

interface SearchResultsProps {
  value: string;
  className?: string;
}

const SEARCH_ENABLED_INPUT_LENGTH = 3;
const MAX_RESULTS = 50;

export default function SearchResults({ value, className }: SearchResultsProps) {
  const { data: repos, loading: reposLoading, error: reposError } = useGithubFetch({
    type: GithubFetchType.REPOSITORIES,
    search: { q: value, per_page: MAX_RESULTS },
    enabled: !!value && value.length >= SEARCH_ENABLED_INPUT_LENGTH,
  });
  const { data: users, loading: usersLoading, error: usersError } = useGithubFetch({
    type: GithubFetchType.USERS,
    search: { q: value, per_page: MAX_RESULTS },
    enabled: !!value && value.length >= SEARCH_ENABLED_INPUT_LENGTH,
  });

  const loading = reposLoading || usersLoading;
  const error = reposError || usersError;
  const hasResults = !!repos?.items.length || !!users?.items.length;
  const hasEnabledSearch = value && value.length >= SEARCH_ENABLED_INPUT_LENGTH;
  
  if(loading) return <Loader className={className} />;
  if(!hasEnabledSearch) return <SearchDisabledBox className={className} />;
  if(error) return <ErrorBox className={className} message={error} />;
  if(!hasResults) return <SearchResultsEmpty className={className} />;

  return <SearchResultsList className={className} repos={repos?.items || []} users={users?.items || []} />;
}
