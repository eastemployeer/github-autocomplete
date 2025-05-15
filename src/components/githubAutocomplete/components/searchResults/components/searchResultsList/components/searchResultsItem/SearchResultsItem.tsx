import { PersonIcon, RepoIcon } from '@primer/octicons-react';
import { SearchResultItem } from '../../types/SearchResultsList';
import styles from './SearchResultsItem.module.scss';
import { GithubFetchType } from '@/components/githubAutocomplete/components/searchResults/hooks/types/useGithubFetch';
import { classJoin } from '@/helpers/utils';

type SearchResultsItemProps = Omit<SearchResultItem, 'id'> & { active: boolean };

export default function SearchResultsItem({ name, avatarUrl, url, fetchType, active }: SearchResultsItemProps) {
  let avatarContent = <></>;
  if(avatarUrl) avatarContent = <img className={styles.avatar} src={avatarUrl} alt={name} width={16} height={16} data-testid="search-results-item-avatar" />;

  let fetchTypeContent = <></>;
  if(fetchType === GithubFetchType.USERS) fetchTypeContent = <PersonIcon size={16} className={styles.fetchTypeIcon} data-testid="search-results-item-person-icon" />;
  if(fetchType === GithubFetchType.REPOSITORIES) fetchTypeContent = <RepoIcon size={16} className={styles.fetchTypeIcon} data-testid="search-results-item-repo-icon" />;

  return (
    <div className={classJoin(styles.SearchResultsItem, active && styles.active)}
         data-testid="search-results-item"
         data-test-active={active}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div className={styles.metadataContainer}>
          {avatarContent}
          <span className={styles.name} data-testid="search-results-item-name">{name}</span>
          {fetchTypeContent}
        </div>
      </a>
    </div>
  );
}
